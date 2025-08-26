const { LongScalar, JSONScalar } = require('../utils/scalars');
const actions = require('../data/action.json');
const triggers = require('../data/trigger.json');
const responses = require('../data/response.json');
const resourceTemplates = require('../data/resourceTemplate.json');
const nodeObjects = require('../data/node.json');

const resolvers = {
  Long: LongScalar,
  JSON: JSONScalar,
  
  Query: {
    node: (_, { nodeId }) => {
      return nodeObjects.find(node => node._id === nodeId);
    },
    nodes: () => nodeObjects,
    actions: () => actions,
    triggers: () => triggers,
    responses: () => responses,
    resourceTemplates: () => resourceTemplates,
  },

  NodeObject: {
    parents: (parent) => {
      if (!parent.parents || parent.parents.length === 0) return [];
      return parent.parents.map(compositeId => 
        nodeObjects.find(node => node.compositeId === compositeId)
      ).filter(Boolean);
    },
    parentIds: (parent) => {
      return parent.parents || [];
    },
    trigger: (parent) => {
      if (!parent.trigger) return null;
      return triggers.find(trigger => trigger._id === parent.trigger);
    },
    triggerId: (parent) => {
      return parent.trigger;
    },
    responses: (parent) => {
      if (!parent.responses || parent.responses.length === 0) return [];
      return parent.responses.map(id => 
        responses.find(response => response._id === id)
      ).filter(Boolean);
    },
    responseIds: (parent) => {
      return parent.responses || [];
    },
    actions: (parent) => {
      const allActionIds = [
        ...(parent.preActions || []),
        ...(parent.actions || []),
        ...(parent.postActions || [])
      ];
      if (allActionIds.length === 0) return [];
      return allActionIds.map(id => 
        actions.find(action => action._id === id)
      ).filter(Boolean);
    },
    actionIds: (parent) => {
      return [
        ...(parent.preActions || []),
        ...(parent.actions || []),
        ...(parent.postActions || [])
      ];
    },
    priority: () => null, 
    colour: () => null,  
    global: (parent) => parent.global || false,
  },

  Action: {
    resourceTemplate: (parent) => {
      if (!parent.resourceTemplateId) return null;
      return resourceTemplates.find(rt => rt._id === parent.resourceTemplateId);
    },
  },

  Trigger: {
    resourceTemplate: (parent) => {
      if (!parent.resourceTemplateId) return null;
      return resourceTemplates.find(rt => rt._id === parent.resourceTemplateId);
    },
  },
};

module.exports = resolvers;