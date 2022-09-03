function customDebounce(func, delay) { 
 
    var args = []; 
 
    var timeoutId; 
 
    return function() { 
 
    // User formal parameters to make sure we add a slot even if a param 
 
    
    // is not passed in 
 
        if (func.length) { 
    
            for (var i = 0; i < func.length; i++) { 
        
                if (!args[i]) { 
            
                args[i] = []; 
            
                } 
            
                args[i].push(arguments[i]); 
        
            } 
    
        } 
    
        // No formal parameters, just track the whole argument list 
    
        else { 
    
            args.push(_.toArray(arguments)); 
    
        } 

        var that = this;
        // 清除上一次延时器
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(that,args)
            args = []
        }, delay);
    }
}

customDebounce((a,b) => {
    console.log('a')

})
 