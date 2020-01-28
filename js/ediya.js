$(function(){
    //languege
    $('.language>a').click(function(e){ 
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });

    // 메뉴버튼
    // var btnFlag=true;
    $('#btn-menu').click(function() {
        $('body').toggleClass('open');
        // 메뉴버튼안의 텍스트를 menu또는 close로 들어가도록 처리하기
        // 조건문 사용

        // if($(this).find('i').text()=='menu'){
        //     $(this).find('i').text('close');
        // }else{
        //     $(this).find('i').text('menu');
        // }

        if ($('body').hasClass('open')){
            $(this).find('i').text('close');
        }else{
            $(this).find('i').text('menu');
        }

        // if ($(this).is(':contains(menu)')) {
        //     $(this).find('i').text('close');
        // }else{
        //     $(this).find('i').text('menu');
        // }

        // if(btnFlag){
        //     btnFlag=false;
        //     $(this).find('i').text('close');
        // }else{
        //     btnFlag=true;
        //     $(this).find('i').text('menu');
        // }
    })


    // 화면의 사이즈가 변경될 때 gnb의 상태 초기화 하기
    $(window).resize(function() {
        // console.log('사이즈가 변경됨');
        $('.gnb>li').removeClass('active');
        var windowWidth=$(window).width();
        if (windowWidth<=1100) {//pc가 아님
            $('.gnb .sub').hide();
        }else{//pc임
            $('.gnb .sub').show();
        }
    })

    // gnb-아코디언 방식
    $('.gnb i').click(function(e) {
        e.preventDefault();
        if ($(this).parents('li').hasClass('active')) {
            $('.gnb>li').removeClass('active');
            $('.gnb .sub').slideUp();
            $('.gnb i').remove('keyboard_arrow_up').text('keyboard_arrow_down');
        }else{
            $('.gnb>li').removeClass('active');
            $('.gnb .sub').slideUp();
            $('.gnb i').remove('keyboard_arrow_up').text('keyboard_arrow_down');
            $(this).parents('li').addClass('active');
            $(this).parent().next().slideDown();
            $(this).remove('keyboard_arrow_down').text('keyboard_arrow_up');
        }
    })

    // scroll
    $(window).scroll(function() {
        var scrollTop=$(window).scrollTop();
        // console.log('현재 스크롤 y의 위치',scrollTop);
        if (scrollTop>0) {//스크롤을 함
            $('body').addClass('scroll');
        } else {//가장 위쪽에 스크롤이 있는 상태
            $('body').removeClass('scroll');
        }  

        // animation
        // main-culture, main-coffee-lab 애니메이션 처리
        // 500정도를 빼주면 그 영역에 도달하기 전에 애니메이션 실행가능
        var cultureLab=$('.main-culture').offset().top-500;
        var coffeeLab=$('.main-coffee-lab').offset().top-500;
        // console.log('main-culture 영역의 시작위치',cultureLab)
        if (scrollTop>cultureLab) {
            // console.log('애니메이션 실행');
            var delay=0;
            $('.main-culture .fadeInUp').each(function(i,el) {
                if (i==0) {delay=500;}
                if (i==1) {delay=0;}
                if (i==2) {delay=1000;}
                // 화살표 함수를 사용하여 각 요소에 접근해서 지연시간 후 
                // on클래스 넣어주기
                // $(el).addClass('on'); 
                var el=$(this);
                setTimeout(function(){$(el).addClass('on')},delay);
                // setTimeout(() => {
                //     $(this).addClass('on')
                // }, delay);
            })
        }else{
            $('.main-culture .fadeInUp').removeClass('on');
        }

        if (scrollTop>coffeeLab) {
            // console.log('애니메이션 실행');
            var delay=0;
            $('.main-coffee-lab .fadeInUp').each(function(i,el){
                if (i==0) {delay=0;}
                if (i==1) {delay=1000;}
                setTimeout(function(){
                        $(el).addClass('on');}
                    ,delay)
            })
        }else{
            $('.main-coffee-lab .fadeInUp').removeClass('on');
        }

    })

    


    // quick-event 담기

    $('.quick-event button').click(function() {
        $('.quick-event').hide();
    })

    
   // main-slide

   $(function(){
    var setting={
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      on:{
        //사용자가 슬라이드 화면을 움직일 때 이벤트발생
        sliderMove:function(){
          $('#play-state').removeClass('fa-pause').addClass('fa-play');           
        }
      }
    }
    var swiper = new Swiper('.swiper-container',setting)

    //화면 사이즈가 변경될 때 소스 변경처리하고 
    //swiper객체 파괴 후 다시 생성 
    $(window).resize(function(){
      var windowW=$(this).width();
      var slideImg=[
        ['img/slide1-m.jpg','img/slide2-m.jpg','img/slide3-m.jpg'],
        ['img/slide1-t.jpg','img/slide2-t.jpg','img/slide3-t.jpg'],
        ['img/slide1.jpg','img/slide2.jpg','img/slide3.jpg']
      ];
      var slideImgIndex=0;
      if(windowW<768){//모바일
        slideImgIndex=0;
      }else if(windowW<992){//태블릿
        slideImgIndex=1;
      }else{//pc
        slideImgIndex=2;
      }

      //swiper객체 파괴 
      swiper.destroy();

      //이미지소스 변경하기 
      $('.swiper-slide img').each(function(i){
        $(this).attr('src',slideImg[slideImgIndex][i]);
      }) 

      //swiper객체 생성 
      swiper = new Swiper('.swiper-container',setting);
      $('#play-state').removeClass('fa-play').addClass('fa-pause');
    }).resize();

    //재생정지버튼의 위치 잡기 
    //1.페이지네이션 전체 넓이 구하기 
    var paginationW=$('.swiper-pagination').width();
    //2.재생정지버튼의 위치잡기 (페이지네이션넓이/2 + 여백)
    $('#play-state').css('margin-left',paginationW/2 + 10)

    // 재생정지 상태 변경 
    $('#play-state').click(function(){
      if($(this).hasClass('fa-pause')){
        $(this).removeClass('fa-pause').addClass('fa-play');
        swiper.autoplay.stop();
      }else{
        $(this).removeClass('fa-play').addClass('fa-pause');
        swiper.autoplay.start();
      }
    })

    // 페이지네이션, 네비게이션을 누르면 재생정지버튼 상태를 재생상태로 변경
    $('[role="button"').click(function(){
      $('#play-state').removeClass('fa-pause').addClass('fa-play');
    })


  });    
 
    
})