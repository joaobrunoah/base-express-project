const Utils = require('./utils');

test('Clone object function', async () => {
  let object1 = {
    a: 1,
    b: 2,
    c: ['D','E'],
    d: [{a:1, b:2},{c:3,d:4}],
    e: new Date()
  };

  expect(Utils.clone(object1)).toEqual(object1);
});

test('Email validation function', async () => {
  expect(Utils.validateEmail('test@test.com')).toBeTruthy();
  expect(Utils.validateEmail('test@test.com.br')).toBeTruthy();
  expect(Utils.validateEmail('test@test.au')).toBeTruthy();
  expect(Utils.validateEmail('test+1@test.au')).toBeTruthy();
  expect(Utils.validateEmail('test@test')).toBeFalsy();
  expect(Utils.validateEmail('blah')).toBeFalsy();
  expect(Utils.validateEmail('@@@')).toBeFalsy();
  expect(Utils.validateEmail('test@test@com')).toBeFalsy();
  expect(Utils.validateEmail('@test.com')).toBeFalsy();
  expect(Utils.validateEmail('@test')).toBeFalsy();
  expect(Utils.validateEmail(' @test.com')).toBeFalsy();
  expect(Utils.validateEmail()).toBeFalsy();
});

test('Password validation function', async () => {
  expect(Utils.validatePassword('weak')).toBeFalsy();
  expect(Utils.validatePassword('weak2')).toBeFalsy();
  expect(Utils.validatePassword('weak23')).toBeFalsy();
  expect(Utils.validatePassword('weak23WW')).toBeTruthy();
  expect(Utils.validatePassword('weak23ww')).toBeFalsy();
  expect(Utils.validatePassword('Strong123')).toBeTruthy();
  // Too long
  expect(Utils.validatePassword('AHUhauhauhauAHuaHA636363')).toBeFalsy();
  // Missing Capital Letter
  expect(Utils.validatePassword('$trong123')).toBeFalsy();
  // Missing Capital Letter
  expect(Utils.validatePassword('$Trong123')).toBeTruthy();
  expect(Utils.validatePassword()).toBeFalsy();
});