import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import {SiteCreators} from "../contracts/about/AboutDto";
import {NewsList} from "../contracts/news/NewDto";

const usesr = [
    {username: "admin", password: "admin"},
    {username: "root", password: "root"},

]


export default class Server {
    constructor(app: Application) {
        console.log("Starting Server");
        this.config(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:3000"
        };
        app.use(express.static('public'))


        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        const port = process.env.PORT || 3000;

        app.post("/auth/login", (req, res) => {
            const {username, password} = req.body;


            if (usesr.filter(u => u.username === username && u.password === password).length > 0) {
                res.send({isLoggedIn: true, userID: "123", userName: "admin"});
            }
            res.send({isLoggedIn: false});
        });


        app.post("/auth/register", (req, res) => {
            const {username, password} = req.body;
            usesr.push({username, password});
            console.log("Registering user: " + username);
            res.send({IsRegistered: true});

        });


        app.post("/auth/logout", (_, res) => {
            res.send({isLoggedIn: false});
        })



        app.get("/api/news", (_, res) => {
            const news: NewsList =  {
                news: [
                    {
                        "id": 1,
                        "title": "Команда OG выигрывает международный турнир",
                        "date": "2024-06-01",
                        "source": "ESPN",
                        "description": "Команда OG одержала победу в финале крупного международного турнира, продемонстрировав выдающиеся навыки и стратегию.",
                        "url": "https://example.com/news/1"
                    },
                    {
                        "id": 2,
                        "title": "Team Liquid завоевывает титул чемпиона мира",
                        "date": "2024-06-05",
                        "source": "IGN",
                        "description": "Team Liquid выиграла титул чемпиона мира после напряженной борьбы в финале.",
                        "url": "https://example.com/news/2"
                    },
                    {
                        "id": 3,
                        "title": "LGD Gaming объявляет о новой стратегии",
                        "date": "2024-06-10",
                        "source": "GameSpot",
                        "description": "LGD Gaming представила свою новую стратегию на предстоящий сезон, обещая новые захватывающие игры.",
                        "url": "https://example.com/news/3"
                    },
                    {
                        "id": 4,
                        "title": "Evil Geniuses побеждают на турнире в Лос-Анджелесе",
                        "date": "2024-06-12",
                        "source": "Kotaku",
                        "description": "Evil Geniuses заняли первое место на турнире в Лос-Анджелесе, демонстрируя великолепные командные взаимодействия.",
                        "url": "https://example.com/news/4"
                    },
                    {
                        "id": 5,
                        "title": "Team Spirit становится чемпионом Европы",
                        "date": "2024-06-15",
                        "source": "The Verge",
                        "description": "Team Spirit выиграла чемпионат Европы, одержав решающую победу в финальном матче.",
                        "url": "https://example.com/news/5"
                    },
                    {
                        "id": 6,
                        "title": "Team Secret готовится к новому сезону",
                        "date": "2024-06-20",
                        "source": "Polygon",
                        "description": "Team Secret объявила о начале подготовки к новому сезону, обещая удивить своих поклонников.",
                        "url": "https://example.com/news/6"
                    },
                    {
                        "id": 7,
                        "title": "Newbee открывает новую тренировочную базу",
                        "date": "2024-06-25",
                        "source": "PC Gamer",
                        "description": "Newbee открыла новую высокотехнологичную тренировочную базу для подготовки к будущим турнирам.",
                        "url": "https://example.com/news/7"
                    },
                    {
                        "id": 8,
                        "title": "Virtus.pro выигрывает региональный турнир",
                        "date": "2024-06-27",
                        "source": "BBC",
                        "description": "Virtus.pro победила в региональном турнире, продемонстрировав превосходство над конкурентами.",
                        "url": "https://example.com/news/8"
                    },
                    {
                        "id": 9,
                        "title": "Vici Gaming заключает контракт с новым спонсором",
                        "date": "2024-06-29",
                        "source": "CNN",
                        "description": "Vici Gaming заключила контракт с новым крупным спонсором, обеспечивающим поддержку на следующие несколько лет.",
                        "url": "https://example.com/news/9"
                    },
                    {
                        "id": 10,
                        "title": "Wings Gaming возвращается на сцену",
                        "date": "2024-06-30",
                        "source": "Reuters",
                        "description": "Wings Gaming объявила о своем возвращении на киберспортивную сцену, планируя участвовать в ближайших крупных турнирах.",
                        "url": "https://example.com/news/10"
                    }
                ]
            };

            res.send(news);
        });

        app.get("/api/about", (_, res) => {



            const members : SiteCreators  =  {
                editorial: {
                    "editorInChief": "Андрей Игоревич Кирюкин",
                    "deputyEditorInChief": "Владислав «Machinae» Животнев"
                },
                authorsAndProofreader: [
                    "Кирилл «gr1nder» Русаков",
                    "Даниил «Smacked» Хвалев",
                    "Владислав «Fesh» Данилюк",
                    "Анастасия «allestron» Висмут",
                    "Вячеслав «PilotBaker» Ипатов",
                    "Баир «Vydar» Модонов",
                    "Сергей «Lampochko» Сергиенко",
                    "Дарья «Evervia» Капустина",
                    "Сергей «J3nner» Атландеров",
                    "Алексей «LexMum» Мумриков",
                    "Арина «jeneva» Умникова",
                    "Богдан «Aurelien» Арисов"
                ],
                proofreader: "Евгения «iLibra» Штанько",
                articleAuthors:  [
                    "Валерия «seba castell» Гребенникова",
                    "Анастасия «NanaMar» Егорова",
                    "Роберт «sleeppoint» Маильянц",
                    "Юлия «shiro_julia» Широбокова",
                    "Артем «TorsionTC» Борода"
                ],
                headOfStatisticsDepartment: "Ярослав «1010» Баштаников",
                statisticsDepartment: [
                    "Александр «ZN» Посельский",
                    "Александр «Apel5in» Гейко",
                    "Николай «uuchiro» Мульчин",
                    "Руслан «Rich» Сафин"
                ]
            };


            res.send(members);
        })


        app.all('*', function(req, res) {
            res.redirect("/");
        });

        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });



    }
}

const srv = new Server(express());
