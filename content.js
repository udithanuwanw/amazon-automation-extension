
function sleepms(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomNumber(min, max) {
    var range = max - min + 1;
    var rand = new Uint32Array(1);
    window.crypto.getRandomValues(rand);
    return min + rand[0] % range;
}
function sleep(x){
    return new Promise(res=>{
        setTimeout(()=>{
            res(true)
        },x*1000)
    })
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function sweep_similler_products(){

    let el = document.getElementsByTagName("*");
    let elWithData = [].filter.call(el, function(el) {
    return el.hasAttribute("data-marketplaceid");
});
    

        let carousel=elWithData[0].querySelector('div');

    

        var scrollAmount = 50;

        var scrollInterval = Math.floor(Math.random() * 50) + 50;

        var scrollIterations = 10;

        var currentIteration = 0;

        function smoothScroll() {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIteration++;
            if (currentIteration < scrollIterations) {
                setTimeout(smoothScroll, scrollInterval);
            }
        }

    smoothScroll();
 

}  
function sweep_product_review_videos(){

 
    

        let carousel=document.querySelector("#cm_cr_videos_carousel_section").querySelector('div');

    

        var scrollAmount = 50;

        var scrollInterval = Math.floor(Math.random() * 50) + 50;

        var scrollIterations = 10;

        var currentIteration = 0;

        function smoothScroll() {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIteration++;
            if (currentIteration < scrollIterations) {
                setTimeout(smoothScroll, scrollInterval);
            }
        }

    smoothScroll();
 

} 
async function doScrolls(times,amount,invert=false){
    let x=document.documentElement.scrollTop
    x+=invert?amount*-1:amount
    for(let i=0;i<times;i++){
        await new Promise(res=>{
            $('html, body').animate({
                scrollTop: x
            }, 1000,a=>{
                res(true)
            });
        })
        await sleep(getRandomInt(2050,3331)/1000)
        x+=invert?amount*-1:amount
    }
    return true;
}
chrome.runtime.onMessage.addListener(
    
async function(request, sender, sendResponse) {
    if (request.type === "search") {
    localStorage.clear();
    console.log('localStorage cleared');  
    console.log(request.keyword);
    console.log(request.asin);
    console.log(request.randomMin);
    console.log(request.randomMax);
    localStorage.setItem("asin", request.asin);
    localStorage.setItem("randomMin", request.randomMin);
    localStorage.setItem("randomMax", request.randomMax);
    console.log('content script is running');
    await sleepms(5000);
    try {
        document.querySelector("#sp-cc-accept").click()
        await sleepms(5000);
        console.log('Cookies accepted')
        
    } catch (error) {
        console.log('Cookies already accepted')
        
    }
    searchInput=document.querySelector(".nav-search-field>input");
    searchInput.value=request.keyword;
    await sleepms(5000);
    localStorage.setItem("currentStep", "searchProduct");
    document.querySelector(".nav-right input").click();
    
    
    

    await sleepms(10000);
    
}
  });
   
if (localStorage.getItem("currentStep")=="searchProduct") {
      console.log('Running...')
	
	    if(document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded',searchProduct);
	} else {
	    
	    searchProduct();
	}
	
    
}
if (localStorage.getItem("currentStep")=="productPageInteraction") {
      
	
	    if(document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded',productPageInteraction);
	} else {
      
	    
	    productPageInteraction();
      
	}
	
    
}
if (localStorage.getItem("currentStep")=="simillerProductInteraction") {
      
	
	    if(document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded',simillerProductInteraction);
	} else {

      
      
	    
	    simillerProductInteraction();
      
	}
	
    
}
if (localStorage.getItem("currentStep")=="simillerProductProcessStarted") {
      
	
	    if(document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded',productPageInteraction);
	} else {

      
      
	    console.log('similler Product Process Started')
	    productPageInteraction();
      
	}
	
    
}

if (localStorage.getItem("currentStep")=="addToCartProcess") {
      
	
	    if(document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded',addToCartProcess);
	} else {

      
      
	    
	    addToCartProcess();
      
	}
	
    
}



async function searchProduct(){
    await sleepms(5000);
    console.log('Searching the product...')
    let asin = localStorage.getItem('asin');
    await sleepms(5000);
    console.log(asin);
    
    
   
    await sleepms(5000);
    await doScrolls(4,document.body.clientHeight/10);
    await doScrolls(2,document.body.clientHeight/10,true);
    await sleepms(5000);
    try {
        targetProduct=document.querySelector("[data-asin=" + CSS.escape(asin) + "]").querySelector("a");
        localStorage.setItem("currentStep", "productPageInteraction");
        targetProduct.click()
      
    } catch (error) {
      alert('Cannot find product in first page')
      
    }
   
   

}
async function productPageInteraction(){
  await sleepms(5000);
  console.log('Discovering Images...');
  await sleep(getRandomInt(2050,3331)/1000);
  if(document.querySelector("#imgTagWrapperId"))document.querySelector("#imgTagWrapperId").click();
  else if(document.querySelector("#landing-image-wrapper"))document.querySelector("#landing-image-wrapper").click();
  await sleep(getRandomInt(2050,3331)/1000);
  let images = document.querySelectorAll(".ivThumb");
  if(images.length==0)images = document.querySelectorAll(".a-popover-wrapper [class='a-image-wrapper']");
  for(let i=0;i<images.length;i++){//OPEN ALL IMAGES
      images[i].click();
      await sleep(getRandomInt(1050,2331)/1000);
      if(document.querySelector("#ivStage")){
          document.querySelector("#ivStage").querySelector("img").click();
      }
      await sleep(getRandomInt(2050,3331)/1000);

  }
  await sleep(getRandomInt(2050,3331)/1000)
  if(document.querySelector("#ivVideosTabHeading")&&document.querySelector("#ivVideosTabHeading").style.display!='none'){//IF VIDEO FOUND WAIT 30s
      document.querySelector("#ivVideosTabHeading").click();
      await sleep(getRandomInt(32728,37341)/1000);
  }
  document.querySelector('#immersive-image-back-announce').click()  
  scrollProductPage();
  
}
async function simillerProductInteraction(){
  await sleepms(10000);
  console.log('similler Product Interaction')
  sweep_similler_products();
  await sleep(getRandomInt(32728,37341)/1000);
  let numberOfRandomSimillerProducts = localStorage.getItem("numberOfRandomSimillerProducts");
  let alreadyVisitedSimillerProducts = JSON.parse(localStorage.getItem("alreadyVisitedSimillerProducts"));
  if(alreadyVisitedSimillerProducts.length!==parseInt(numberOfRandomSimillerProducts)){
    sweep_similler_products();
    await sleep(getRandomInt(10728,15341)/1000);
    let elements = document.getElementsByTagName("*");
    let elementsWithDataValue = [].filter.call(elements, function(element) {
    return element.hasAttribute("data-marketplaceid");
});
    let matchingElement=elementsWithDataValue[0];

    let simillerProducts=[]
    let simillerNodeList=matchingElement.querySelector('ol').querySelectorAll('li');
    for (let node of simillerNodeList) {
        if(node.querySelector('div').getAttribute('id')!==null){

            console.log(node.querySelector('div').getAttribute('id'))
            simillerProducts.push(node.querySelector('div').getAttribute('id'))
        }
      
    }

    console.log('simillerProducts ',simillerProducts);
   
    
    
  
    
      

    
    

    while (true) {

        

    try {
        targetSimillerProduct=simillerProducts[Math.floor(Math.random() * simillerProducts.length)];
    

   
        await sleep(getRandomInt(7000,12000)/1000);
        
        console.log(targetSimillerProduct);
        
        
        
    
        
        
        
        document.querySelector("[id=" + CSS.escape(targetSimillerProduct) + "]").querySelector('a').click();
        alreadyVisitedSimillerProducts.push(targetSimillerProduct);
        localStorage.removeItem('alreadyVisitedSimillerProducts');


        localStorage.setItem("alreadyVisitedSimillerProducts", JSON.stringify(alreadyVisitedSimillerProducts));
        console.log(alreadyVisitedSimillerProducts);
        localStorage.setItem("currentStep", "simillerProductProcessStarted");
        console.log('Choosed a similler product..')
        await sleep(getRandomInt(7000,12000)/1000);
        break;
        
    } catch (error) {
        console.log(error+'retrying.......')
        
    }  
    }   

  
  /*let targetSimillerProduct=randomSimillerProducts[0]
  console.log(targetSimillerProduct);
  randomSimillerProducts = randomSimillerProducts.filter(item => item !== targetSimillerProduct);
  console.log(randomSimillerProducts);
  localStorage.removeItem('randomSimillerProducts');
  localStorage.setItem("randomSimillerProducts", JSON.stringify(randomSimillerProducts));
  localStorage.setItem("currentStep", "simillerProductProcessStarted");
  await sleepms(10000);
  document.querySelector("[id=" + CSS.escape(targetSimillerProduct) + "]").querySelector('img').click();
  await sleepms(10000);*/
    

  }
  else{
    console.log('time to addToCart')
    localStorage.setItem("currentStep", "addToCartProcess");
    await sleepms(5000);
    location.reload();
  }



}

async function addToCartProcess(){
  await sleep(getRandomInt(2050,3331)/1000);
  if(!document.querySelector("#outOfStock")&&!document.querySelector("#exportAlternativeTriggerButton")){
        console.log("scrolling")
        await scrollToY(document.querySelector('#add-to-cart-button'))
        await sleep(getRandomInt(1050,2331)/1000);
        localStorage.setItem("currentStep", "processEnded");
        
        
        document.body.querySelector("#add-to-cart-button").click()
                       
    }else{

              console.log("out of stock")
              alert('Outof stock')
              localStorage.setItem("currentStep", "processEnded");}
  console.log("Process ended....")    

}

async function scrollToY(element){
    return new Promise(async res=>{
        try{
            let hereWeAre = document.documentElement.scrollTop
            let wereWeNeedToBe = window.pageYOffset+element.getBoundingClientRect().top
            let distance = wereWeNeedToBe - hereWeAre;
            let realDistance = distance
            if(realDistance<0)realDistance=realDistance*-1
            if(realDistance<1500){
                $('html, body').animate({
                    scrollTop: wereWeNeedToBe
                }, distance*1.8<3000?3000:distance*1.8,()=>{
                    res(true)
                });
            }else{
                wereWeNeedToBeStep = distance/3
                distance = distance/3
                console.log(element)
                console.log(distance)
                for(let i=3;i>=0;i--){
                    await new Promise(t=>{
                        console.log(wereWeNeedToBe - wereWeNeedToBeStep*i)
                        $('html, body').animate({
                            scrollTop: wereWeNeedToBe - wereWeNeedToBeStep*i
                        }, distance*1.8<3000?3000:distance*1.8,()=>{
                           t(true)
                        });
                    })
                }
                res(true)
            }
        }catch(err){
            console.log(err)
            res(true)
        }
    })
}
async function scrollProductPage(){
    console.log("test1");
    await sleep(getRandomInt(2137,3672)/1000);
    await scrollToY(document.querySelector("#title"));
    await sleep(getRandomInt(2137,3672)/1000);
    try{
        let t = $('div:contains("Produktinformationen")');
        await scrollToY(t[t.length-1]);
        await sleep(getRandomInt(15032,20362)/1000);
    }catch(err){
        console.log("description erorr");
        console.log(err);
    }
    console.log("test2");
    try{
        t = $('div:contains("Produktdetails")');
        await scrollToY(t[t.length-1]);
        await sleep(getRandomInt(15032,20362)/1000);
    }catch(err){
        console.log("details erorr");
        console.log(err);
    }
    console.log("test3");
    await scrollToY(document.querySelector("#ask-btf-container"));
    await sleep(getRandomInt(15032,30000)/1000);

    if(document.querySelector("#cm_cr_videos_carousel_section")){
        await scrollToY(document.querySelector("#cm_cr_videos_carousel_section"));
        await sleep(getRandomInt(2050,3331)/1000);
        sweep_product_review_videos();
        await sleep(getRandomInt(2050,3331)/1000);

        
        let videos = document.querySelectorAll('[data-action="reviews:open-mweb-immersive-video-modal"]');
        if (videos.length>3) {
            numberOfVideos=getRandomNumber(2,4);
            
        } else {
            numberOfVideos=videos.length;
            
        }
       

    
        
    for(let i=0;i<numberOfVideos;i++){
        videos[i].querySelector('img').click();
        await sleep(getRandomInt(25728,37341)/1000);

        document.querySelector("#vse_reviews_mobile-overlay-container\\  > img").click()
        await sleep(getRandomInt(7050,10331)/1000);

  }
    }
    let r = document.querySelectorAll('[data-hook="review"],[data-hook="mobley-review-content"]');
    rl = Math.round(r.length*0.65);
    console.log(rl);
    for(let i=0;i<rl;i++){
        await scrollToY(r[i]);
        if(r[i].querySelector('[role="button"],[data-hook="redirect-see-more"]')){
            console.log(r[i].querySelector('[role="button"],[data-hook="redirect-see-more"]'));
            r[i].querySelector('[role="button"],[data-hook="redirect-see-more"]').click();
        }
        await sleep(getRandomInt(7000,12000)/1000);
    }
    
    await scrollToY(document.querySelector('.a-carousel-header-row,.a-carousel-heading'));
    
    await sleep(getRandomInt(7000,12000)/1000);


    if (localStorage.getItem("currentStep")=="productPageInteraction"){

    //let xpath = "//h2[text()='Products related to this item']";
    //let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    

    //console.log(xpath);
    //console.log(matchingElement);
    let elements = document.getElementsByTagName("*");
    let elementsWithDataValue = [].filter.call(elements, function(element) {
    return element.hasAttribute("data-marketplaceid");
});
    let matchingElement=elementsWithDataValue[0];

    await scrollToY(matchingElement);
    try {
    await sleep(getRandomInt(7000,12000)/1000);
    //let simillerProducts=JSON.parse(matchingElement.parentElement.parentElement.parentElement.getAttribute('data-a-carousel-options'))['initialSeenAsins'].slice(0, 7);
    let elements2 = document.getElementsByTagName("*");
    let elementsWithDataValue2 = [].filter.call(elements2, function(elements2) {
    return elements2.hasAttribute("data-marketplaceid");
});
    let matchingElement2=elementsWithDataValue2[0];

    sweep_similler_products();
    await sleep(getRandomInt(7000,12000)/1000);

    let minViewProducts = parseInt(localStorage.getItem('randomMin'));
    let maxViewProducts = parseInt(localStorage.getItem('randomMax'));
    console.log('minViewProducts '+minViewProducts);
    console.log('maxViewProducts '+maxViewProducts);
    let numberOfRandomSimillerProducts = getRandomNumber(minViewProducts, maxViewProducts);
    
    localStorage.setItem("numberOfRandomSimillerProducts", numberOfRandomSimillerProducts);
    
    let simillerProducts=[]
    let simillerNodeList=matchingElement2.querySelector('ol').querySelectorAll('li');
    for (let node of simillerNodeList) {
        if(node.querySelector('div').getAttribute('id')!==null){

            console.log(node.querySelector('div').getAttribute('id'))
            simillerProducts.push(node.querySelector('div').getAttribute('id'))
        }
      
    }

    console.log('simillerProducts ',simillerProducts);
   
    
    
  
    
      

    
    

    while (true) {

        

    try {
        firstTargetSimillerProduct=simillerProducts[Math.floor(Math.random() * simillerProducts.length)];
    

   
        
        
        console.log(firstTargetSimillerProduct);
        
        
        


        
        document.querySelector("[id=" + CSS.escape(firstTargetSimillerProduct) + "]").querySelector('a').click();
        alreadyVisitedSimillerProducts=[firstTargetSimillerProduct];
        localStorage.setItem("alreadyVisitedSimillerProducts", JSON.stringify(alreadyVisitedSimillerProducts));
        localStorage.setItem("currentStep", "simillerProductProcessStarted");
        await sleep(getRandomInt(7000,12000)/1000);
        console.log('Choosed a similler product..');
        break;
        
    } catch (error) {
        console.log(error+'retrying.......')
        
    }  
    }  
    } catch (error) {
        console.log(error)
        await sleepms(20000);
        location.reload();
        
    }

  }
  else{
    await sleep(getRandomInt(7000,12000)/1000);
    localStorage.setItem("currentStep", "simillerProductInteraction");
    await sleep(getRandomInt(7000,12000)/1000);
    history.back()
  }


}
