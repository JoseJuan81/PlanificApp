import { GraphQLSchema } from "graphql";
import { query } from '../schema/query';
import { mutation } from '../schema/mutation';

export default new GraphQLSchema({
	mutation,
	query,
});
