import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const BudgetInput = new GraphQLInputObjectType({
    name: 'BudgetInput',
    fields: {
        amount: { type: GraphQLFloat },
        currencyCode: { type: GraphQLString },
    },
});

const CheckListInput = new GraphQLInputObjectType({
    name: 'CheckListInput',
    fields: {
        done: { type: GraphQLBoolean },
        title: { type: GraphQLString },
    }
});

const RelatedTaskInput = new GraphQLInputObjectType({
    name: 'RelatedTaskInput',
    fields: {
        condition: { type: GraphQLString },
        id: { type: GraphQLString },
    },
});

const TimeTaskInput = new GraphQLInputObjectType({
    name: 'TimeTaskInput',
    fields: {
        endDate: { type: GraphQLString },
        duration: { type: GraphQLFloat },
        initDate: { type: GraphQLString },
    },
});

export const CreateTaskInput = new GraphQLInputObjectType({
    name: 'CreateTaskInput',
    fields: {
        assignedId: { type: GraphQLString },
        budget: { type: BudgetInput },
        checkList: { type: new GraphQLList(CheckListInput) },
        comments: { type: GraphQLString },
        companyId: { type: GraphQLString },
        expenses: { type: new GraphQLList(GraphQLString) },
        labels: { type: new GraphQLList(GraphQLString) },
        links: { type: new GraphQLList(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        parentTaskId: { type: GraphQLString },
        relatedTask: { type: new GraphQLList(RelatedTaskInput) },
        spent: { type: new GraphQLList(RelatedTaskInput) },
        subTasks: { type: new GraphQLList(GraphQLString) },
        status: { type: GraphQLString },
        userId: { type: GraphQLString },
        time: { type: TimeTaskInput },
    },
});