import Vue from 'vue'
Vue.directive('lazy',{
    // 添加图片监听
    bind: intersectionObserver.bind(this)
})

export function intersectionObserver (el) {
    Vue.nextTick(() => {
        var observer = new IntersectionObserver(function(entries) {
            if (entries[0].intersectionRatio <= 0) return;
            entries.forEach((entry) => {
                let lazyImage = entry.target;
                // 相交率，默认是相对于浏览器视窗
                if (entry.intersectionRatio > 0) {
                    lazyImage.src = lazyImage.getAttribute('data-src');
                    // 当前图片加载完之后需要去掉监听
                    observer.unobserve(lazyImage);
                }
            })
            // loadItems(10);
            console.log('Loaded new items');
        })
        observer.observe(el)  
    })
  
}