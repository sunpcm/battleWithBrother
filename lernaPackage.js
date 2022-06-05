const source = [
    // {
    //     id: "z",
    //     dep: []
    // },
    {
        id: 'a',
        dep: []
    },
    {
        id: 'b',
        dep: []
    },
    {
        id: 'c',
        dep: ['a', 'b']
    },
    {
        id: 'd',
        dep: ['a', 'b']
    },
    {
        id: 'e',
        dep: ['a', 'b']
    },
    {
        id: 'f',
        dep: ['c', 'd']
    },
    {
        id: 'g',
        dep: ['e']
    },
    {
        id: 'h',
        dep: ['f', 'g']
    },
    {
        id: 'i',
        dep: ['g']
    }
]


const timer = {
    a: 1,
    b: 2,
    c: 14,
    d: 2,
    e: 8,
    f: 3,
    g: 2,
    h: 12,
    i: 1,
}





const build = (id, fn) => {
    setTimeout(fn, [timer[id] * 1000])
}



let finishList = [];
const topPackage = source.filter( n=> n.dep.length === 0)
const childPackage = source.filter( n=> n.dep.length !== 0).map(n=>({...n, skip:false}));

const notice = (id) => {
    console.log(`end build id: ${id}`);
    finishList = finishList.concat(id).sort();
    if (childPackage.filter(n=>!n.skip).length === 0) {
        if(finishList.length === childPackage.length + topPackage.length){
            console.log('FINISHED!!!')
        }
        return;
    }
    childPackage.forEach((i,index) => {
        if(!childPackage[index].skip && finishList.toString().includes(i.dep.toString())) {
            console.log(`start build id: ${i.id}`);
            childPackage[index].skip=true;
            build(i.id, ()=>notice(i.id))
        }
    })
}

const getBuildLogs = () => {

topPackage.forEach(n=>{
        console.log(`start build id: ${n.id}`);
        build(n.id, ()=>notice(n.id))
    })

}

getBuildLogs();
