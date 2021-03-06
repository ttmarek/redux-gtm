const createEvents = require('../src/create-events');

describe('createEvents(eventDefinitions, prevState, action)', () => {
  describe('When the event definition is an empty object', () => {
    it('maps the action type to the new event objects event property', () => {
      const eventDefinitions = {};
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{ event: 'SOME_ACTION_TYPE' }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition is an empty array', () => {
    it('returns an empty array', () => {
      const eventDefinitions = [];
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition has an eventName property', () => {
    it('maps the eventName to the new event objects event property', () => {
      const eventDefinitions = { eventName: 'event1' };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{ event: 'event1' }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition has an eventFields method', () => {
    it('calls eventFields with the prevState and the action', () => {
      const eventDefinitions = { eventFields: jest.fn() };
      const prevState = { prop1: 'value1', prop2: 'value2' };
      const action = { type: 'SOME_ACTION_TYPE' };

      createEvents(eventDefinitions, prevState, action);
      expect(eventDefinitions.eventFields).toHaveBeenCalledWith(prevState, action);
    });
    it('merges any object returned by eventFields into the new event', () => {
      const eventDefinitions = { eventFields: () => ({ prop: 'value 1' }) };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{
        event: 'SOME_ACTION_TYPE',
        prop: 'value 1',
      }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
    it('prioritizes any "event" key returned by eventFields as the event name', () => {
      const eventDefinitions = { eventFields: () => ({ event: 'some-event-name' }) };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{ event: 'some-event-name' }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition has an eventSchema property', () => {
    it('returns the event if it matches the schema', () => {
      const eventDefinitions = {
        eventName: 'pageview',
        eventFields() {
          return { route: '/login' };
        },
        eventSchema: {
          event: value => value === 'pageview',
          route: value => value !== '/my-account',
        },
      };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{
        event: 'pageview',
        route: '/login',
      }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
    it('does not return the event if it does not match the schema', () => {
      const eventDefinitions = {
        eventName: 'pageview',
        eventFields() {
          return { route: '/my-account' };
        },
        eventSchema: {
          event: value => value === 'pageview',
          route: value => value !== '/my-account',
        },
      };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When an array of event definitions is provided', () => {
    it('creates an event for each event definition', () => {
      const eventDefinitions = [{}, {}, {}];
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = 3;
      const actual = createEvents(eventDefinitions, prevState, action).length;
      expect(actual).toBe(expected);
    });
  });
});
