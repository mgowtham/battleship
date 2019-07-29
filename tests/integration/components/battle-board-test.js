import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';

module('Integration | Component | battle-board', function(hooks) {
  setupRenderingTest(hooks);

  test('check whether placement test works properly', async function(assert) {
    this.set('viewMode', true);
    let ships = [{ size: 4 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }, { size: 3 }];
    this.set('ships', ships);
    await this.render(hbs`{{battle-board viewMode=viewMode ships=ships}}`);
    let row, column;
    if (this.get('ships.firstObject.isHorizontal')) {
       row = this.get('ships.firstObject.fixedPos');
       column = this.get('ships.firstObject.variablePos');
    } else {
      column = this.get('ships.firstObject.fixedPos');
      row = this.get('ships.firstObject.variablePos');
    }
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), 'x');
  });

  test('check whether test game works properly', async function(assert) {
    this.set('viewMode', false);
    let ships = [{ size: 4 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }, { size: 3 }];
    this.set('ships', ships);
    await this.render(hbs`{{battle-board viewMode=viewMode ships=ships}}`);
    let row, column;
    if (this.get('ships.firstObject.isHorizontal')) {
       row = this.get('ships.firstObject.fixedPos');
       column = this.get('ships.firstObject.variablePos');
    } else {
      column = this.get('ships.firstObject.fixedPos');
      row = this.get('ships.firstObject.variablePos');
    }
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), '');
    await click(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`);
    assert.equal(this.$(`.row:nth-child(${row + 2}) .cell:nth-child(${column + 2})`).text().trim(), 'x');
  });  
});
