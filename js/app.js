class Player {
    constructor(name, score) {

        this.name = name;
        this.score = score;
        this.active = false;
    }

}


$(() => {


    function insertData(questions) {

        const users = [];

        var timer;
        var time2;

        let currentPlayerIndex = 0;


        $('#firstInput').on("click", function (e) {

            $('.players').slideDown() &&
            $('.firstSlider').slideUp();

        });

        $('#secondInput').on("click", function () {


            $('.players').slideUp();
            $('.nameOfPlayers').slideDown();


            $('.formPlayers input').each((index, elem) => {
                const value = $(elem).val();

                const newUser = new Player(value, 0);

                users.push(newUser);


                const el = $('<p class="playersTable">').text(newUser.name + ':' + newUser.score + ' punkty');
                $('.playersScore').append(el)

            });

        });

        x = 0;

        $('#startGame').on("click", function () {


            $('#end').removeClass('hidden');


            $('.playersTable').eq(currentPlayerIndex).addClass("activePlayer");


            $('.nameOfPlayers').slideUp() &&
            $('.questions').slideDown();

            let array = [];
            const random = Math.floor((Math.random()) * questions.length);
            $(array).push($(random));

            console.log(random);


            var span = $('<span class="question">', {class: "name"});
            span.text(questions[random].name)
            $('.questions').prepend(span);


            questions = questions.filter((question) => question.name !== questions[random].name);


            var counter = 6;

            $('#timer').html('-');

            time2 = setInterval(function () {

                counter = counter - 1;
                $('#timer').html(counter);
                if (counter === 0) {
                    clearInterval(time2);
                    $('#timer').html('Czas minął!!!');
                    document.querySelector('#music').play()
                }

            }, 1000);


            $('#timer').html('-');
            clearInterval(timer);

        });

        $('#yes').on('click', function () {
            users[currentPlayerIndex].score++;


            $('.playersTable').eq(currentPlayerIndex).text(users[currentPlayerIndex].name + ' : ' + users[currentPlayerIndex].score + ' punkty');

            $("#yes").addClass('hidden');

            $('#no').addClass('hidden');

            $('.correct').addClass('hidden');

            clearInterval(time2);
            clearInterval(timer);


        });

        $('#no').on('click', function () {
            $("#yes").addClass('hidden');

            $('#no').addClass('hidden');

            $('.correct').addClass('hidden');

            clearInterval(time2);
            clearInterval(timer);


        });

        $("#nextQuestion").on("click", function () {
            clearInterval(timer);
            clearInterval(time2);


            $('.playersTable').eq(currentPlayerIndex).removeClass("activePlayer");


            if (currentPlayerIndex === users.length - 1) {
                currentPlayerIndex = 0
            } else
                currentPlayerIndex++;
            $('.playersTable').eq(currentPlayerIndex).addClass("activePlayer");


            $('.questions').children().first().html('');

            const random = Math.floor((Math.random()) * questions.length);

            var span = $('<span class="question">', {class: "name"});

            span.text(questions[random].name);
            $('.questions').prepend(span);


            $("#yes").removeClass('hidden');

            $('#no').removeClass('hidden');

            $('.correct').removeClass('hidden');


            $('#timer').html('-');

            var counter = 6;

            timer = setInterval(function () {

                counter = counter - 1;
                $('#timer').html(counter);
                if (counter === 0) {
                    clearInterval(timer);
                    $('#timer').html('Czas minął!!!');

                    document.querySelector('#music').play()
                }

            }, 1000);


            questions = questions.filter((question) => question.name !== questions[random].name);

        });

        $('.numberOfPlayers').on("submit", function (el) {
            el.preventDefault();

            let quantity = $('.quantity').val();
            for (i = 0; i < quantity; i++) {
                $('.formPlayers').prepend($('<input class="name" type="text" placeholder="imię">'))

            }

        });


        $('.formPlayers').on("submit", function (f) {
            f.preventDefault();

            let players = $('.name');

            $.each(players, function (i, el) {
                $('.listOfPlayers').append($('<span >', {id: i, text: $(this).val()}))
            })
        });

        $('#gameOver').on("click", function () {

            $('.container').addClass('hidden');
            $('#gameOver').addClass('hidden');
            $('.playersScore').prepend('<h1>Tablica wyników:</h1>');
            $('.playersTable').eq(currentPlayerIndex).removeClass("activePlayer");
            $('.playersTable').addClass('decided');
            document.querySelector('#music2').play()



        })

    }

    $.ajax({
        url: 'questions'
    }).done(function (data) {
        insertData(data);
        console.log(data);
    });


});

