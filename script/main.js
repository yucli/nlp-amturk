var _allowSubmit = false;

var taskId = 1;
var numMovie = 3;
var scores = [];
var noScore = -10;

var movieContent = {
    'movie': [
        {
            'title-ch': '蜘蛛人：返校日',
            'title-eng': 'Spider-Man: Homecoming',
            'description':
                '蜘蛛人重回漫威電影宇宙後全新作品！最新電影《蜘蛛人：返校日》將時間軸拉回彼得帕克的高中時光,描述在《美國隊長3：英雄內戰》後，彼得在「心靈導師」鋼鐵人東尼史塔克的指引下，回到他與梅嬸的溫暖家庭。然而在試圖融入過去平凡生活的同時，一心想證明蜘蛛人不僅是鄰家英雄代表的念頭仍不斷在彼得心裡出現，直到全新反派禿鷹的強勢現身，才讓他意識到身邊珍惜的事物都將遭受嚴重威脅。',
            'title-generated': 'hello'
        },
        {
            'title-ch': '妖怪手錶：誕生的秘密喵',
            'title-eng': 'Yo-kai Watch the Movie',
            'description':
                '某一天晚上，景太正呼呼大睡，戴在手上的妖怪手錶突然發出刺眼光芒，接著消失不見了！為了找回妖怪手錶，景太、威斯帕、吉胖喵跟著浮游喵一起進入時光旅行，回到了六十年前的昔日世界！在那裡等待著他們的強大敵人究竟是誰？妖怪手錶能否順利地找回來呢？',
            'title-generated': 'wachichi'
        },
        {
            'title-ch': '讓子彈飛',
            'title-eng': 'Let The Bullets fly',
            'description':
                '時空背景設定在北洋軍閥時期，一段發生在中國南方的傳奇故事，有盪氣迴腸的兄弟情誼、生不逢時的亂世愛情，同時穿插了馬戰、槍戰、巷戰等多大製作場景。融合了江湖熱血和黑色幽默，劇情虛實交錯，叫人拍案叫絕，完全突破了中國傳統大片風格的西部傳奇電影！',
            'title-generated': '讓子彈飛一會兒'
        }
    ]
};

$(document).ready(function() {
    if (gup('assignmentId') === 'ASSIGNMENT_ID_NOT_AVAILABLE') {
        $('body').empty();
        $('body').css('background', 'white');
        var noteDiv =
            $('<div class=\'container\'><h3>Please accept the HIT.</h3></div>');
        $(noteDiv).css('margin-left', 'auto');
        $(noteDiv).css('margin-right', 'auto');
        $(noteDiv).css('text-align', 'center');
        var img = $('<img></img>')
        $(img).attr(
            'src',
            'https://c2.staticflickr.com/4/3665/11276962563_8fc141d195.jpg');
        /* image from https://flic.kr/p/ibvo62 */
        $(img).css('width', '600px');
        $(noteDiv).append(img);
        $('body').append(noteDiv);
        $('input').attr('DISABLED', 'true');
        _allowSubmit = false;
    } else {
        _allowSubmit = true;
    }

    for (i = 0; i < numMovie; ++i) {
        scores[i] = noScore;
    }

    $('#btn-accept').click(function() {
        $('#div-description').hide();
        $('#div-task').show();
        showTask(taskId);
        setButtonStatus(taskId);
    });

    $('#btn-previous').click(function() {
        showTask(--taskId);
        setScoreButton(taskId, taskId + 1);
        setButtonStatus(taskId);
    });

    $('#btn-next').click(function() {
        showTask(++taskId);
        setScoreButton(taskId, taskId - 1);
        setButtonStatus(taskId);
    });

    $('#btn-submit').click(function() {
        submitToTurk();
    });

    $('.btn-secondary').click(function() {
        $(this).addClass('active');
        $('.btn-group :eq(' + getScore(taskId) + ')').removeClass('active');
        setScore(taskId, this.name);
    });

    function gup(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return '';
        else
            return unescape(results[1]);
    }

    function showTask(taskId) {
        var imgUrl = 'image/poster_' + taskId + '.jpg';
        $('.card-header').text('Task ' + taskId + ' of ' + numMovie);

        $('.card-img-bottom')
            .css('background', 'url(' + imgUrl + ') center no-repeat');

        $('#p-task-id').text('Task ' + taskId);
        $('#h4-title-chinese')
            .text(movieContent['movie'][taskId - 1]['title-ch']);
        $('#h6-title-eng').text(movieContent['movie'][taskId - 1]['title-eng']);
        $('#p-movie-description')
            .text(movieContent['movie'][taskId - 1]['description']);
        $('#p-title-generated')
            .text(movieContent['movie'][taskId - 1]['title-generated']);
    }

    function setScoreButton(curId, preId) {
        $('.btn-group :eq(' + getScore(preId) + ')').removeClass('active');
        if (getScore(curId) != noScore) {
            $('.btn-group :eq(' + getScore(curId) + ')').addClass('active');
        }
    }

    function setButtonStatus(taskId) {
        $('#btn-previous').prop('disabled', taskId == 1 ? true : false);
        $('#btn-next').prop('disabled', taskId == numMovie ? true : false);
        $('#btn-submit').prop('disabled', taskId < numMovie ? true : false);
    }

    function getScore(taskId) {
        return scores[taskId - 1];
    }

    function setScore(taskId, value) {
        scores[taskId - 1] = value;
    }

    function submitToTurk() {
        if (gup('assignmentId') != '') {
            var jobkey = gup('assignmentId');
            if (gup('hitId') != '') {
                jobkey += '|' + gup('hitId');
            }
            if (gup('assignmentId') == 'ASSIGNMENT_ID_NOT_AVAILABLE') {
                $('input').attr('DISABLED', 'true');
                _allowSubmit = false;
            } else {
                _allowSubmit = true;
            }
            $('#mturk‐assignmentId').attr('value', gup('assignmentId'));

            $('#div-mturk-score > input').each(function(index) {
                this.value = scores[index];
            });

            $('#mturk_form').attr('method', 'POST');
            if (gup('turkSubmitTo') != '') {
                $('#mturk_form').attr('action', gup('turkSubmitTo'));
            }
        }
        $('#mturk_form').submit();
        /*For some reasons you need this*/
        return false;
    }
});