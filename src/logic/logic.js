const input = [
    'A-200-A,B,C,D',
    'A-300-A,B,D',
    'C-600-A,B,C',
    'D-1000-C',
    'B-200-C,D',
    'A-600-A,B,C,D',
    'A'
]
function soln(newarr){
    const ans=[];
    const tem = newarr.map((e)=>{
        return e[2]
    })
    const allNames = tem.join(',')
    const SplitedAllNames = allNames.split(',')
    const NamesSet = new Set(SplitedAllNames)
    console.log([...NamesSet])
    const firstArr=['.',...NamesSet];
    ans.push(firstArr)
    const a=[...NamesSet]
    const len=[...NamesSet].length
    a.map(ele => {
        const t=[]
        t.push(ele);
        for(let i=0;i<len;i++){
            t.push(0)
        }
        ans.push(t)
    })
    console.log(ans)
}

function solve(arr){
    const query = arr.pop()
    const transformedArr = arr.map((e)=>{
        const [name, amount,...borrowers] = e.split('-')
        return [name,parseInt(amount),borrowers]
    })
    soln(transformedArr)
    console.log(transformedArr)
    console.log(query)
    
}

solve(input)
