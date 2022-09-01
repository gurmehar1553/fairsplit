const input = [
    'A-200-A,B,C,D',
    'A-300-A,B,D',
    'C-600-A,B,C',
    'D-1000-C',
    'B-200-C,D',
    'A-600-A,B,C,D',    
    'B'
]
function coordinateValue(arr,a,b){
    const n=arr.length;
    for(let i=0;i<n;i++){
        if(arr[i][0]!=a){
            continue
        }
        else{
            for(let j=0;j<arr[0].length;j++){
                if(arr[0][j]==b){
                    return arr[i][j]
                }
            }
        }
    }
}
function lent(ans,a){
    var amt=0;
    for(let i=0;i<ans[0].length;i++){
        if(ans[0][i]=='.' || ans[i][0]==a){
            continue
        }
        amt+=coordinateValue(ans,a,ans[0][i]);
    }
    console.log(a+" lent "+amt)
}
function borrow(ans,a){
    const n=ans.length;
    var amt=0;
    for(let i=0;i<n;i++){
        if(ans[i][0]=='.' || ans[i][0]==a){
            continue
        }
        amt+=coordinateValue(ans,ans[i][0],a);
    }
    console.log(a+" borrowed "+amt)
}
function addValues(ans,newarr,query){
    newarr.forEach((ele)=>{
        var [name,amt,borrowers]=ele;
        borrowers=borrowers.split(',')
        const borr_len=borrowers.length;
        amt=amt/borr_len;
        // console.log(borrowers)
        for(let i=1;i<ans[0].length;i++){
            if(ans[i][0]===name){
                borrowers.forEach((ele)=>{
                    for(let j=1;j<=ans[0].length;j++){
                        if(ans[0][j]===ele){
                            ans[i][j]+=amt;
                        }
                    }
                })
            }
        }
    })
    console.log(ans)
    // console.log(coordinateValue(ans,'B','C'))
    // console.log("A lent "+coordinateValue(ans,'A','B')+" to B")
    // console.log("A lent "+coordinateValue(ans,'A','C')+" to C")
    // console.log("A lent "+coordinateValue(ans,'A','D')+" to D")
    lent(ans,query);
    borrow(ans,query)
}
function soln(newarr,query){
    const ans=[];
    const tem = newarr.map((e)=>{
        return e[2]
    })
    const allNames = tem.join(',')
    const SplitedAllNames = allNames.split(',')
    const NamesSet = new Set(SplitedAllNames)
    console.log("set of users:",[...NamesSet])
    const firstArr=['.',...NamesSet];
    ans.push(firstArr)
    const a=[...NamesSet]
    const len=[...NamesSet].length
    a.forEach(ele => {
        const t=[]
        t.push(ele);
        for(let i=0;i<len;i++){
            t.push(0)
        }
        ans.push(t)
    })
    console.log("unfilled Answer users:",ans)
    addValues(ans,newarr,query)
}
function solve(arr){
    const query = arr.pop()
    const transformedArr = arr.map((e)=>{
        const [name, amount,borrowers] = e.split('-')
        return [name,parseInt(amount),borrowers]
    })
    soln(transformedArr,query)
    console.log(transformedArr)
    console.log(query)
    
}
solve(input)