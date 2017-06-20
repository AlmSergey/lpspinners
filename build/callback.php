<?php

if (isset($_GET)) {
    $phone = trim(htmlspecialchars($_GET['phone']));
    $name = trim(htmlspecialchars($_GET['name']));
    $message = 'Номер телефона: ' . $phone . '<br>' . 'Имя: ' . $name;

    $to = 'sportsale2000@gmail.com';

    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: <noreply@spiner.co.ua>' . "\r\n";

    mail($to, 'Перезвоните мне ' . $phone, $message, $headers);
}