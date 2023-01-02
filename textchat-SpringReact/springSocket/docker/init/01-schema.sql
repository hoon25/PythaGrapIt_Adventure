create table if not exists `user`
(
    `user_id` bigint auto_increment primary key,
    `username` varchar(255) not null,
    `password` varchar(255) not null,
    `email` varchar(255) not null,
    `created_at` timestamp not null default current_timestamp,
    `updated_at` timestamp not null default current_timestamp on update current_timestamp
);
