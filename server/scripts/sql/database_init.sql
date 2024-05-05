create table users(
    id bigint(255) not null,
    username varchar(255) not null,
    profile_image_url varchar(255),
    constraint primary key(id)
)

insert into users values(3438458852, "이동섭테스트", "https://k.kakaocdn.net/dn/hnBkP/btsFJoUDZOB/OlMJJJVtGynakyxyBB1tO1/img_640x640.jpg")

insert into users values(3438458851, "이동섭", "https://k.kakaocdn.net/dn/hnBkP/btsFJoUDZOB/OlMJJJVtGynakyxyBB1tO1/img_640x640.jpg")

drop table users