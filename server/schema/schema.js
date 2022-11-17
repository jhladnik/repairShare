const Phase = require('../models/Phase');
const Task = require('../models/Task');

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

//Task Type
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      phase: {
        type: PhaseType,
        resolve(parent, args) {
          return Phase.findById(parent.phaseId);
        },
      },
    }),
});

//Phase Type
const PhaseType = new GraphQLObjectType({
    name: 'Phase',
    fields: () => ({
        id: { type: GraphQLID },
        number: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          return Task.find();
        },
      },
      task: {
        type: TaskType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Task.findById(args.id);
        },
      },
      phases: {
        type: new GraphQLList(PhaseType),
        resolve(parent, args) {
          return Phase.find();
        },
      },
      phase: {
        type: PhaseType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Phase.findById(args.id);
        },
      },
    },
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      // Add a phase
      addPhase: {
        type: PhaseType,
        args: {
          description: { type: new GraphQLNonNull(GraphQLString) },
          number: { type: new GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'PhaseStatus',
              values: {
                new: { value: 'Not Completed' },
                completed: { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Started',
          },
          phaseID: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const phase = new Phase({
            description: args.description,
            number: args.number,
            status: args.status,
          });
  
          return phase.save();
        },
      },
      // Delete a phase
      deletePhase: {
        type: PhaseType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          Task.find({ phaseId: args.id }).then((tasks) => {
            tasks.forEach((task) => {
              task.remove();
            });
          });
  
          return Phase.findByIdAndRemove(args.id);
        },
      },
      // Add a task
      addTask: {
        type: TaskType,
        args: {
          description: { type: new GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'TaskStatus',
              values: {
                new: { value: 'Not Completed' },
                completed: { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Completed',
          },
          phaseId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const task = new Task({
            description: args.description,
            status: args.status,
            phaseId: args.phaseId,
          });
  
          return task.save();
        },
      },
      // Delete a task
      deleteTask: {
        type: TaskType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          return Task.findByIdAndRemove(args.id);
        },
      },
      // Update a task
      updateTask: {
        type: TaskType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: 'TaskStatusUpdate',
              values: {
                new: { value: 'Not Started' },
                completed: { value: 'Completed' },
              },
            }),
          },
        },
        resolve(parent, args) {
          return Task.findByIdAndUpdate(
            args.id,
            {
              $set: {
                description: args.description,
                status: args.status,
              },
            },
            { new: true }
          );
        },
      },
      //Update a phase
      updatePhase: {
        type: PhaseType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          number: { type: GraphQLString },
          description: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: 'PhaseStatusUpdate',
              values: {
                new: { value: 'Not Started' },
                completed: { value: 'Completed' },
              },
            }),
          },
        },
        resolve(parent, args) {
          return Phase.findByIdAndUpdate(
            arg.id,
            {
              $set: {
                description: args.description,
                status: args.status
              },
            },
            { new: true }
          );
      },
    },
  }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});