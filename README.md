Памятка по запуску Postgres и PG-admin:

PG Admin будет доступен тут:
localhost:5050
Но он долго заводится, потому сначала заход на локалхост выдаст ошибку.

Доступ в него после того, как он заведётся:
admin@admin.com
pgadmin4

Хост в настройках подключения базы и в регистрации сервера ПГ-админа - это имя сервиса с постгресом! Но если вдруг по каким-то причинам не используется композ - тогда там должен быть localhost.

После проникновения в ПГ-админ (чтобы подтянуть подключенную базу):
1) ПКМ по Servers слева-сверху
2) Register -> Server
3) General -> Name: которое будет отображаться в админке, любое
4) Connection:
Host name/address: ИМЯ СЕРВИСА С БД В КОМПОЗЕ! (не контейнера, сервиса!)
Port: 5432
Maintenance database: postgres
Username: Юзер для подключения к БД (в композе)
Password: Пароль для подключения к БД (в композе)
Дальнейший доступ к созданному серверу также будет осуществляться по этому паролю. Можно его запомнить.

В любой непонятной ситуации вычищать вольюмы (и базы, и пг-админа)

---------------------

Декораторы, которые точно понадобятся:

@PrimaryGeneratedColumn() = PRIMARY KEY AUTO_INCREMENT (лучше делать намбер)

@PrimaryColumn() - а это без автоинкремента (нужно задавать самому при создании сущности)
составные первичные ключи - несколько @PrimaryColumn()

@CreateDateColumn — это специальный столбец, в котором автоматически устанавливается дата вставки объекта. Вам не нужно задавать этот столбец — он будет установлен автоматически.

@UpdateDateColumn — это специальный столбец, в котором автоматически устанавливается время обновления сущности каждый раз, когда вы вызываете saveменеджера сущности или репозиторий. Вам не нужно задавать этот столбец — он будет установлен автоматически.

@DeleteDateColumn — это специальный столбец, в котором автоматически устанавливается время удаления объекта каждый раз, когда вы вызываете обратимое удаление менеджера объекта или репозитория. Вам не нужно задавать этот столбец — он будет установлен автоматически. Если установлен @DeleteDateColumn , областью по умолчанию будет «неудаляемый».

@Column({ type: "int" }) - столбец таблицы

---------------------

Типы столбцов для postgres:

int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, , , bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, , point, line, lseg, box, path, polygon, circle, , cidr, inet, macaddr

---------------------

ЕНУМКИ:
export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role: UserRole
}

---------------------

Опции столбца, которые точно пригодятся:

length: number - Длина типа столбца. Например, если вы хотите создать varchar(150)тип, вы указываете тип столбца и параметры длины.

nullable: boolean - Делает столбец NULLили NOT NULLв базе данных. По умолчанию столбец nullable: false.

select: boolean — Определяет, следует ли скрывать этот столбец по умолчанию при выполнении запросов. Если установлено значение false, данные столбца не будут отображаться при стандартном запросе. По умолчанию столбецselect: true

default: string - Добавляет значение столбца уровня базы данных DEFAULT.

primary: boolean - Помечает столбец как основной. То же самое, если вы используете @PrimaryColumn.

unique: boolean — Помечает столбец как уникальный (создает ограничение уникальности).
