$(document).ready(() => {
    $('.loader').show();
    $('.lotr-quotes').hide();
    $('.spn-quotes').hide();
    $('.strng-thing-quotes').hide();
    $('.morningstar-quotes').hide();
    $('.hp-quotes').hide();
    $('.asoif-quotes').hide();
    $('.chuck-norris').hide();

    const updatedAt = $('.updated-at');
    let today = new Date();
    updatedAt.append(today.toDateString());


    function getChuckQuote() {
        $('.chuck-norris').show();
        $('#chuck-norris-loader').hide();

        $.ajax({
            url: 'https://api.chucknorris.io/jokes/random',
            type: 'GET',
            success: (joke) => {
                $('.chuck-norris').show();
                $('#chuck-norris-loader').hide();

                const punchline = joke.value;
                $('.chuck-norris > .card > .row > .col-lg-9 > .card-body > .card-text').html(punchline);
            },
            error: (error) => {
                console.error('Error: ' + error);
            }
        });
    }

    function getASOIF() {
        $.ajax({
            url: 'https://thronesapi.com/api/v2/Characters',
            type: 'GET',
            success: (data) => {
                const characters = Object.keys(data);
                const randomCharacter = Math.floor(Math.random() * characters.length);
                const characterName = data[randomCharacter].fullName;

                const nameArr = characterName.toLowerCase().split(" ");
                const firstName = nameArr[0];

                for (let i = 0; i < characters.length; i++) {
                    if (data[i].id === randomCharacter) {
                        $('#asoif-character').html(`${data[i].fullName}, ${data[i].title}`);
                        $('#asoif-character-pic').attr('src', data[i].imageUrl);
                    }
                }

                $.ajax({
                    url: `https://api.gameofthronesquotes.xyz/v1/author/${firstName}`,
                    type: 'GET',
                    success: (element) => {
                        $('#asoif-loader').hide();
                        $('.asoif-quotes').show();

                        if (element) {
                            $('#asoif-quotes').empty();
                            $('#asoif-quotes').append(element.sentence);
                        }
                    },
                    error: (error) => {
                        console.error('Error: ' + error);
                    }
                });

            },
            error: (error) => {
                console.error('Error: ' + error);
            }
        });
    }

    function getHP() {
        $('.hp-quotes').hide();
        $('#hpLoader').show();
        $.ajax({
            url: 'https://hp-api.onrender.com/api/characters',
            type: 'GET',
            success: (element) => {
                $('.hp-quotes').show();
                $('#hpLoader').hide();
                function findRandomHPCharacter() {
                    let gender, role, patronus, possessive, ancestry, wand, wandPossession;
                    const index = Math.floor(Math.random() * element.length);
                    const randomCharacter = element[index];

                    wand = randomCharacter.wand;
                    ancestry = randomCharacter.ancestry;
                    patronus = randomCharacter.patronus;

                    if (randomCharacter.species === "cat") {
                        gender = "They";
                    }
                    else {
                        if (randomCharacter.gender === "male") {
                            gender = "He";
                        }
                        else {
                            gender = "She";
                        }
                    }

                    if (gender === "They") {
                        possessive = "are"
                    }
                    else {
                        possessive = "is"
                    }

                    if (patronus === '') {
                        patronus = "does not have a Patronus"
                    }
                    else {
                        patronus = `does and it is a ${randomCharacter.patronus.charAt(0).toUpperCase() + randomCharacter.patronus.slice(1)}`;
                    }

                    if (randomCharacter.hogwartsStudent === true) {
                        role = "is a student";
                    }
                    else if (randomCharacter.hogwartsStaff === true) {
                        role = "is a staff member";
                    }

                    if (!ancestry) {
                        if (gender === "He") {
                            gender = "His"
                        }
                        else if (gender === "She") {
                            gender = "Her"
                        }
                        else {
                            gender = "Their"
                        }
                        ancestry = "ancestry is Unknown"
                        possessive = ""
                    }
                    else {
                        ancestry = ancestry.charAt(0).toUpperCase() + randomCharacter.ancestry.slice(1)
                    }

                    if (wand.wood === '' || wand.core === '' || wand.length === null) {
                        if (gender === "He") {
                            wandPossession = "His"
                        }
                        else if (gender === "She") {
                            wandPossession = "Her"
                        }
                        else {
                            wandPossession = "Their"
                        }
                        wand = "wand is Unknown"
                    }
                    else {
                        length = wand.length;
                        core = wand.core.charAt(0).toUpperCase() + wand.core.slice(1);
                        wood = wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1);
                        wand = `wand is ${length}in with a ${core} core, made of ${wood} wood`
                    }

                    if ((randomCharacter.hogwartsStaff === true || randomCharacter.hogwartsStudent === true) && randomCharacter.image !== "") {
                        $('#hp-character').html(randomCharacter.name);
                        $('#hp-character-pic').attr('src', randomCharacter.image);
                        $('#hp-short1').html(`${randomCharacter.name} is played by ${randomCharacter.actor}, ${gender} ${possessive} a ${randomCharacter.species.charAt(0).toUpperCase() + randomCharacter.species.slice(1)}`);
                        $('#hp-short2').html(`${gender} ${role} at Hogwarts, ${gender} ${patronus}. ${gender} ${possessive} ${ancestry}`);
                        $('#hp-short3').html(`${randomCharacter.name}'s ${wand}`)
                    }
                    else {
                        findRandomHPCharacter();
                    }
                }
                findRandomHPCharacter();
            },
            error: (error) => {
                console.error('Error: ' + error);
            }
        });
    }

    getChuckQuote();
    getASOIF();
    getHP();
    setInterval(() => {
        getASOIF();
    }, 7000);
    setInterval(() => {
       getHP(); 
    }, 30000);
    setInterval(() => {
        getChuckQuote();
    }, 5000)
});
