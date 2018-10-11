<?php

if (empty($_GET['name'])) {
	echo json_encode([
		'status' => 'failed'
	]);
	exit;
}

$name = $_GET['name'];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.instagram.com/$name/");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$result = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if($http=="200") {
	$doc = new DOMDocument();
	$doc->loadHTML($result);
	$xpath = new DOMXPath($doc);
	$js = $xpath->query('//body/script[@type="text/javascript"]')->item(0)->nodeValue;
	$start = strpos($js, '{');
	$end = strrpos($js, ';');
	$json = substr($js, $start, $end - $start);
	$data = json_decode($json, true);
	$userData = $data["entry_data"]["ProfilePage"][0]["graphql"]["user"];

	$url = "";

	if (!empty($userData["profile_pic_url_hd"])) {
		$url = $userData["profile_pic_url_hd"];
	} else if (!empty($userData["profile_pic_url"])) {
		$url = $userData["profile_pic_url"];
	}

	if (empty($url)) {
		echo json_encode([
			'status' => 'failed'
		]);
		exit;
	}

	echo json_encode([
		'status' => 'success',
		'url' => $url
	]);

} else {
	echo json_encode([
		'status' => 'failed'
	]);
	exit;
}