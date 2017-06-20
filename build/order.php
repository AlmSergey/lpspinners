<?php

if (isset($_GET)) {
    $phone = trim(htmlspecialchars($_GET['phone']));
    $name = trim(htmlspecialchars($_GET['name']));
    $order = trim(htmlspecialchars($_GET['order']));
    $message = 'Номер телефона: ' . $phone . '<br>' . 'Имя: ' . $name . '<br>' . 'Заказ:' . $order . '<br>';

    $to = 'sportsale2000@gmail.com';

    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: <noreply@spiner.co.ua>' . "\r\n";

    mail($to, 'Заказ товара ' . $phone, $message, $headers);
}