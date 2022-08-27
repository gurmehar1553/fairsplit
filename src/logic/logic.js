const input = [
    'A-200-A,B,C,D',
    'A-300-A,B,D',
    'C-600-A,B,C',
    'D-1000-C',
    'B-200-C,D',
    'A-600-A,B,C,D',
    'A'
]
function actualLentAmt(ans,amt,n1){
    const n=ans[0].length;
    var t=0;
    for(let i=0;i<n;i++){
        if(ans[0][i]!=n1){
            continue
        }
        for(let j=1;j<n;j++){
            t+=ans[j][i];
        }
    }
    return amt-t
}
function lent(ans){
    const n=ans[0].length
    console.log("lent")
    ans.filter((ele)=>{
        return ele[0]!='.'
    }).map((ele)=>{
        const n1=ele[0]
        var amt=0;
        for(let i=1;i<n;i++){
            amt+=ele[i]
        }
        amt=actualLentAmt(ans,amt,n1)
        if(amt>=0){
            console.log(n1+" lent "+amt)
        }
        else{
            console.log(n1+ " borrowed "+Math.abs(amt))
        }
    })
}
function addValues(ans,newarr){
    newarr.map((ele)=>{
        var [name,amt,...borrowers]=ele;
        borrowers=borrowers[0][0].split(',')
        // console.log(borrowers)
        for(let i=1;i<ans[0].length;i++){
            if(ans[i][0]==name){
                borrowers.map((ele)=>{
                    for(let j=1;j<=ans[0].length;j++){
                        if(ans[0][j]==ele){
                            ans[i][j]+=amt;
                        }
                    }
                })
            }
        }
    })
    console.log(ans)
    lent(ans);
}
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
    addValues(ans,newarr)
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