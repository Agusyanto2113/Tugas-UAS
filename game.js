const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Pelaksanaan proklamasi kemerdekaan RI dilakukan di ....',
        choice1: 'Jalan Pegangsaaan Timur No. 56',
        choice2: 'Rengasdengklok',
        choice3: 'Rumah Laksamana Maeda',
        choice4: 'Istana Merdeka',
        answer: 1,
    },
    {
        question: "Pada tanggal 16 Agustus 1945, golongan muda membawa Sukarno dan Moh. Hatta ke ....",
        choice1: "Jalan Pegangsaaan Timur No. 56",
        choice2: "Rengasdengklok",
        choice3: "Rumah Laksamana Maeda",
        choice4: "Istana Merdeka",
        answer: 2,
    },
    {
        question: "Bendera merah putih yang pertama berkibar saat proklmasi adalah bendera ....",
        choice1: "Bekas bendera jepang",
        choice2: "Bendera belanda yang disobek",
        choice3: "Buatan pabrik",
        choice4: "Jahitan tangan",
        answer: 4,
    },
    {
        question: "Naskah Proklamasi otentik atau resmi adalah naskah yang ....",
        choice1: "Diketik Ahmad Soebardjo dan ditanda-tangani Sukarno dan Moh. Hatta",
        choice2: "Ditulis tangan dan ditanda-tangani Sukarno dan Moh.Hatta",
        choice3: "Ditanda-tangani Sukarno dan Moh.Hatta",
        choice4: "Diketik Sayuti Melik dan ditanda-tangani Sukarno dan Moh.Hatta",
        answer: 4,
    },
    {
        question: "Salah satu kunci keberhasilan perjuangan kemerdekaan Indonesia yaitu ....",
        choice1: "Cinta kepada harta benda",
        choice2: "Semangat mewujudkan harpaan sendiri",
        choice3: "Persatuan dan kesatuan para pahlawan",
        choice4: "Rela berkorban demi jabatan",
        answer: 3,
    },
    {
        question: "Setiap tanggal 17 Agustus, untuk memperingati hari kemerdekaan diadakan ....",
        choice1: "Upacara peringatan hari kebangkitan nasional",
        choice2: "Upacara peringatan hari kemerdekaan Indonesia",
        choice3: "Pesta olahraha Indonesia",
        choice4: "Pesta makan",
        answer: 2,
    },
    {
        question: "Di bawah ini yang BUKAN makna Proklamasi Kemerdekaan Indonesia yaitu ...",
        choice1: "Bangsa Indonesia menantang negara penjajah",
        choice2: "Puncak perjuangan bangsa Indonesia.",
        choice3: "Lahirnya negara Republik Indonesia.",
        choice4: "Bangsa Indonesia menyusun pemerintahan.",
        answer: 1,
    },
    {
        question: "Tiga tokoh bangsa Indonesia yang mengusulkan rumusan Pancasila ketika sidang BPUPKI yaitu ….",
        choice1: "Sukarno, Moh. Hatta, dan Supomo",
        choice2: "Moh yamin, Moh. Hatta, Sukarno",
        choice3: "Moh. Yamin, Sukarno, Supomo",
        choice4: "Moh. Yamin, Sukarno, Subarjo",
        answer: 3,
    },
    {
        question: "Sidang BPUPKI pertama bertujuan untuk…",
        choice1: "Penentuan proklamasi",
        choice2: "Membuat dasar negara",
        choice3: "Mengusir penjajah",
        choice4: "Menetapkan wilayah RI",
        answer: 2,
    },
    {
        question: "Kapan BPUPKI dibentuk?",
        choice1: "27 april 1945",
        choice2: "28 april 1945",
        choice3: "29 april 1945",
        choice4: "30 april 1945",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Pertanyaan ${questionCounter} dari ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()