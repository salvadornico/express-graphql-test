const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql")

const customers = [
	{ id: "1", name: "Steve", email: "steve@steve.com", age: 18 },
	{ id: "2", name: "Dustin", email: "dustin@steve.com", age: 11 },
	{ id: "3", name: "Eleven", email: "11@steve.com", age: 11 },
]

const CustomerType = new GraphQLObjectType({
	name: "Customer",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		age: { type: GraphQLInt },
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		customer: {
			type: CustomerType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return customers.filter(customer => customer.id == args.id)
			}
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})