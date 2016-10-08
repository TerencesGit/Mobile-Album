  $(function() {
        var total = 17;
        var winWidth = $(window).width(),
        	  winHeight = $(window).height();
        var render = function() {
            var padding = 2;
            var picWidth = Math.floor((winWidth - padding * 3) / 4);
            var tmpl = '';
            for (var i = 1; i <= total; i++) {
                var padd = padding;
                var imgSrc = '../images/' + i + '.jpg';
                if (i % 4 == 1) {
                    padd = 0
                }
                tmpl += '<li data-id="'+i+'" class="animated bounceIn" style="width: ' + picWidth + 'px; height:' + picWidth + 'px;padding-top:' + padding + 'px;padding-left:' + padd + 'px"><canvas id="cvs_'+i+'"></canvas></li>';
                var imageObj = new Image();
                imageObj.index = i;
                imageObj.onload = function(){
                	var cvs = $('#cvs_'+this.index)[0].getContext('2d');
                	cvs.width = this.width;
                	cvs.height = this.height;
                	cvs.drawImage(this,0,0)
                }
                imageObj.src = imgSrc;
            }
            $('.container').html(tmpl)
        }
        render()
        var largeImg = $('.large-img');
        var domImage = largeImg[0];
        var loadImg = function(id,callback){
        	$('.large').show()
        	var imgSrc = '../images/'+id+'.large.jpg';
        	var imgObj = new Image();
        	imgObj.onload = function(){
        		var w = this.width;
        		var h = this.height;
        		var realW = winHeight*w/h;
        		var realH = winWidth*h/w;
        		var paddingLeft = parseInt((winWidth-realW)/2);
        		var paddingTop = parseInt((winHeight-realH)/2)
        		largeImg.css({
        			width: 'auto',
        			height: 'auto',
        			paddingLeft: 0,
        			paddingTop: 0
        		})
        		if(h/w > winHeight/winWidth){
        			largeImg.attr('src',imgSrc).css({
        				'height': winHeight,
        				'paddingLeft': paddingLeft
        			})
        		}else{
        			largeImg.attr('src',imgSrc).css({
        				'width': winWidth,
        				'paddingTop': paddingTop
        			})
        		}
        		callback && callback();
        	}
        	imgObj.src = imgSrc
        }
        var cid;
        $('.container').delegate('li','tap',function(){
        	var _id = cid = $(this).attr('data-id'); 
        	loadImg(_id)
        })
        $('.large').tap(function(){
        	$(this).hide()
        }).swipeLeft(function(){
        	cid++;
        	if(cid >total){
	        	cid = total
	        }else{
        	loadImg(cid, function(){
        		domImage.addEventListener('webkitAnimationEnd',function(){
        			largeImg.removeClass('animated bounceInRight')
        			domImage.removeEventListener('webkitAnimationEnd',function(){})
        		},false)
        		largeImg.addClass('animated bounceInRight')
        	})
        }
        }).swipeRight(function(){
        	cid--;
        	if(cid < 1){
        		cid = 1
        	}else{
        	loadImg(cid,function(){
        		domImage.addEventListener('webkitAnimationEnd',function(){
        			largeImg.removeClass('animated bounceInLeft')
        			domImage.removeEventListener('webkitAnimationEnd',function(){})
        		},false)
        		largeImg.addClass('animated bounceInLeft')
        	})
        }
        })
  })