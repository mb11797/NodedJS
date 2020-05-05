let root = {
    data: 10,
    children: [
        {
            data: 20,
            children: [
                {
                    data: 50,
                    children: []
                },
                {
                    data: 60,
                    children: []
                }
            ]
        },
        {
            data: 30,
            children: [
                {
                    data: 70,
                    children: []
                },
                {
                    data: 80,
                    children: [
                        {
                            data: 100,
                            children: []
                        },
                        {
                            data: 110,
                            children: []
                        }
                    ]
                },
                {
                    data: 90,
                    children: []
                }
            ]
        },
        {
            data: 40,
            children: [
                {
                    data: 120,
                    children: []
                }
            ]
        }
    ]
}

// console.log(root);
// console.group(root);

// Recursion
function displayGtree(node){
    // node => children
    let node_n_fam = node.data + "=>";
    for(let i=0; i<node.children.length; i++){
        node_n_fam += node.children[i].data + ", ";
    }
    console.log(node_n_fam + ".");
    // faith or expectation at work
    for(let i=0; i<node.children.length; i++){
        displayGtree(node.children[i]);
    }
}

displayGtree(root);