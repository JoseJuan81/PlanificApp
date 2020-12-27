import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const GeoPosition = new GraphQLObjectType({
	name: 'GeoPosition',
	fields: {
		type: { type: GraphQLString },
		coordinates: { type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)) },
	},
});
