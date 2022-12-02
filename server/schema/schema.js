const Phase = require('../models/Phase');
const Task = require('../models/Task');

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    //enum specifies a range of possible values
    GraphQLEnumType,
} = require('graphql');

//Task Type
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      //we want to be able to identify which phase the task belongs to
      phase: {
        type: PhaseType,
        //response
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

//Allow us to make queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //object fields rather than function
    fields: {

      //find all tasks
      tasks: {
        //just finding the list of 'tasks' that are considered TaskType
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          //we want all tasks in this query
          return Task.find();
        },
      },

      task: {
        type: TaskType,
        //taking in a single task, need to be able to identify
        args: { id: { type: GraphQLID } },
        //our return/response
        resolve(parent, args) {
          //we want specifics here, specific task located by Id
          return Task.findById(args.id);
        },
      },

      //find all phases
      phases: {
        //find the list of PhaseType objects
        type: new GraphQLList(PhaseType),
        resolve(parent, args) {
          //we want all phases here
          return Phase.find();
        },
      },

      phase: {
        type: PhaseType,
        //taking in a single phase, we need to identify which one
        args: { id: { type: GraphQLID } },
        //our resolve = the response
        resolve(parent, args) {
          //we are trying to access a specific Phase, by id
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
          number: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'PhaseStatus',
              values: {
                'new': { value: 'Not Completed' },
                'completed': { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Completed',
          },
         // phaseId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          //creation of new phase using model
          const phase = new Phase({
            //pass in values; args from query which should come from a form on frontend
            number: args.number,
            description: args.description,
            status: args.status,
          });
          //saving phase to database
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
          name: { type: new GraphQLNonNull(GraphQLString)},
          description: { type: new GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'TaskStatus',
              values: {
                'new': { value: 'Not Completed' },
                'completed': { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Completed',
          },
          phaseId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          //creation of new task using model
          const task = new Task({
            //pass in values; args from query that should come from a form on frontend
            name: args.name,
            description: args.description,
            status: args.status,
            phaseId: args.phaseId,
          });
          //save to database
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
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: 'TaskStatusUpdate',
              values: {
                'new': { value: 'Not Completed' },
                'completed': { value: 'Completed' },
              },
            }),
          },
        },
        resolve(parent, args) {
          return Task.findByIdAndUpdate(
            args.id,
            {
              //setting the values per arguments
              $set: {
                name: args.name,
                description: args.description,
                status: args.status,
              },
            },
            //if not there, creating a new task
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
                'new': { value: 'Not Started' },
                'completed': { value: 'Completed' },
              },
            }),
          },
        },
        resolve(parent, args) {
          return Phase.findByIdAndUpdate(
            arg.id,
            {
              $set: {
                number: args.number,
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