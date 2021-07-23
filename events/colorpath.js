export default function colorShortestPath(toAnimateNodes, parent, start) {

    let delay = 0.5
    toAnimateNodes.forEach( (node) => {
        setTimeout(() => {
            document.getElementById(node).style.backgroundColor ="#49a5d7" 
          }, 0)
          document.getElementById(node).style.transitionDelay = `${delay}s` 
          delay += 0.005 
    })
    console.log('hi')
    let crawl = toAnimateNodes[toAnimateNodes.length - 1] 
    let shortestPath = [] 
    shortestPath.push(crawl) 

    do{
        shortestPath.push(parent[crawl]) 
        crawl = parent[crawl] 
    }while(parent[crawl] !== start)
    shortestPath.push(crawl) 
    shortestPath = shortestPath.reverse() 
    console.log(shortestPath)
    shortestPath.forEach((node) => {
        setTimeout(() => document.getElementById(node).style.backgroundColor = "#fffe6a", delay * 1000) 
    }) 
}
  