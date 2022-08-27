// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const input = [
    'A-200-A,B,C,D',
    'A-300-A,B,D',
    'C-600-A,B,C',
    'D-1000-C',
    'B-200-C,D',
    'A-600-A,B,C,D',
    'A'
]
const ans=[];
function soln(newarr){
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
    a.map((ele)=>{
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

// function solve(arr){
//     const query = arr.pop()
//     const transformedArr = arr.map((e)=>{
//         const [name, amount,...borrowers] = e.split('-')
//         return [name,parseInt(amount),borrowers]
//     })
//     console.log(transformedArr)
//     console.log(query)
// }
// function solve(arr){
//     var ans;
//     for(let i=0;i<arr.length;i++){
//         var str=arr[i];
//         var ch=str[0];
//         var i1=str.indexOf('-');
//         var i2=str.lastIndexOf('-');
//         var amt=str.slice(i1,i2+1);
//         var str2=str.slice(i2+1);
//         var arr2=str.split(',');
//         soln(amt,ch,arr2,ans);
//     }
// }

solve(input)
