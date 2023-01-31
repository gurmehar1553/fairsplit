export default function swDev(){
    let swPath = (process.env.PUBLIC_URL)+"/sw.js"
    navigator.serviceWorker.register(swPath).then((e) => console.log(e))
}