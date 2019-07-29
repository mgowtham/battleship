import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';
import { get, set } from '@ember/object'

module('Integration | Component | battle-board', function(hooks) {
  let SHIPS = [{ size: 4 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }, { size: 3 }];
  setupRenderingTest(hooks);
  hooks.beforeEach( function() {
    set(this,'ships', SHIPS );
   });

  test('check whether placement test works properly', async function(assert) {
    set(this, 'testMode', false);
    await this.render(hbs`{{battle-board testMode=testMode ships=ships}}`);
    let fixedPos = get(this, 'ships.firstObject.fixedPos'), 
        variablePos = get(this, 'ships.firstObject.variablePos');
    let [row, column] = get(this, 'ships.firstObject.isHorizontal') ? [fixedPos, variablePos] : [variablePos, fixedPos];
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), 'x');
    assert.equal(this.$(`.row:first-child .cell:nth-child(2)`).text().trim(), 'a');
  });

  test('check whether test game works properly', async function(assert) {
    set(this, 'testMode', true);
    await this.render(hbs`{{battle-board testMode=testMode ships=ships}}`);
    let fixedPos = get(this, 'ships.firstObject.fixedPos'), 
        variablePos = get(this, 'ships.firstObject.variablePos');
    let [row, column] = get(this, 'ships.firstObject.isHorizontal') ? [fixedPos, variablePos] : [variablePos, fixedPos];
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), '');
    await click(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`);
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), 'x');
  });  
});
