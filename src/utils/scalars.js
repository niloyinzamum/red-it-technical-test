const { GraphQLScalarType, Kind } = require('graphql');

const LongScalar = new GraphQLScalarType({
    name: 'Long',
    description: 'Long integer type',
    serialize(value) {
      return Number(value);
    },
    parseValue(value) {
      return Number(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return Number(ast.value);
      }
      return null;
    },
  });

const JSONScalar = new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON custom scalar type',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          return JSON.parse(ast.value);
        case Kind.OBJECT:
          return ast.value;
        default:
          return null;
      }
    },
  });

module.exports = { LongScalar, JSONScalar };