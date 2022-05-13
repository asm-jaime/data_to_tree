'use strict';

const fs = require('fs');

const data_tree = require('./data-simple.json').data;

// 1. sort
data_tree.sort((a, b) => {
    if(a[1] < b[1]) return -1;
    if(a[1] > b[1]) return 1;
    return 0;
});

// 2. fill plain nodes for O(n)
const nodes = {};
for(const node of data_tree) {
  nodes[node[0]] = Object.create(null);
}

// 3. make tree
let root_node = {};
for(const node of data_tree) {
  const current_node = node[0];
  if(node[1] === "root") {
    root_node = nodes[node[0]];
    continue;
  }

  const path_nodes = node[1].split('/');
  const parent_node = path_nodes[path_nodes.length - 1];

  nodes[parent_node][current_node] = nodes[current_node];

}

console.log(data_tree[0]);
//console.log(root_node);

const save_tree = (tree) => {
  fs.writeFile(`./tree-simple.json`, JSON.stringify(tree),
    'utf8', () => console.log(`>>: save tree is done`)
  );
};

save_tree(root_node);
