const {info}=require("../utils/logger");

function coordinateValue(arr,a,b){
    const n=arr.length;
    for(let i=0;i<n;i++){
        if(arr[i][0]!==a){
            continue
        }
        else{
            for(let j=0;j<arr[0].length;j++){
                if(arr[0][j]===b){
                    return arr[i][j]
                }
            }
        }
    }
}
function lent(ans,a){
    var amt=0;
    for(let i=0;i<ans[0].length;i++){
        if(ans[0][i]==='.' || ans[i][0]===a){
            continue
        }
        amt+=coordinateValue(ans,a,ans[0][i]);
    }
}
function borrow(ans,a){
    const n=ans.length;
    var amt=0;
    for(let i=0;i<n;i++){
        if(ans[i][0]==='.' || ans[i][0]===a){
            continue
        }
        amt+=coordinateValue(ans,ans[i][0],a);
    }
    
    
}
function addValues(ans,newarr,query){
    newarr.forEach((ele)=>{
        info('ele ->',ele)
        var [name,amt,borrowers]=ele;
        const borr_len=borrowers.length;
        amt=parseFloat((amt/borr_len).toFixed(2));
        for(let i=1;i<ans[0].length;i++){
            if(ans[i][0]===name){
                borrowers.forEach((ele)=>{
                    info("Element: ",ele )
                    for(let j=1;j<=ans[0].length;j++){
                        if(ans[0][j]===ele){
                            ans[i][j]+=amt;
                        }
                    }
                })
            }
        }
    })
    info(ans)
    // lent(ans,query);
    // borrow(ans,query)
    let ans_arr=[]
    for(let i=1;i<ans[0].length;i++){
        const result=coordinateValue(ans,ans[0][i],query)-coordinateValue(ans,query,ans[0][i])
        if(result === 0){
            continue
        }
        let obj={
            action:result<0,
            amount:Math.abs(result),
            to:ans[0][i]
        }
        ans_arr.push(obj)
    }
    info(ans_arr)
    return ans_arr
}
function makeUnfilledArray(newarr,query){
    const allNames = newarr.reduce((arr,e)=> arr.concat(e[2]),[])
    const [...NamesSet] = new Set(allNames)
    const ans=[['.',...NamesSet]]
    const len=NamesSet.length

    info("set of users:",NamesSet)

    NamesSet.forEach(ele => {
        const t= new Array(len).fill(0)
        ans.push([ele,...t])
    })
    
    return addValues(ans,newarr,query)
}
function solve(arr,query){
    const transformedArr = arr.map(({lenders, amt_lent ,borrowers})=> [lenders,parseInt(amt_lent),borrowers])
    return makeUnfilledArray(transformedArr,query)   
}

module.exports=solve