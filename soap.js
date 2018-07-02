document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById("soap");
	// onClick's logic below:
    button.addEventListener('click', soap);
});

function soap() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://localhost/mantisbt/api/soap/mantisconnect.php', true);

			// build SOAP request
            var sr =
                '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:man="http://futureware.biz/mantisconnect" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">'+
					'<soapenv:Header/>'+
					'<soapenv:Body>'+
						'<man:mc_issue_add soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
							'<username xsi:type="xsd:string">administrator</username>'+
							'<password xsi:type="xsd:string">root</password>'+
							'<issue xsi:type="man:IssueData">'+
								'<summary xsi:type="xsd:string">'+document.getElementById("summary").value+'</summary>'+
								'<description xsi:type="xsd:string">'+document.getElementById("description").value+'</description>'+
								'<reproducibility xsi:type="man:ObjectRef">'+
									'<name xsi:type="xsd:string">'+document.getElementById("reproducibility").value+'</name>'+
								'</reproducibility>'+
								'<priority xsi:type="man:ObjectRef">'+
								   '<name xsi:type="xsd:string">'+document.getElementById("priority").value+'</name>'+
								'</priority>'+
								'<severity xsi:type="man:ObjectRef">'+
								   '<name xsi:type="xsd:string">'+document.getElementById("severity").value+'</name>'+
								'</severity>'+
								'<additional_information xsi:type="xsd:string">'+document.getElementById("details").value+'</additional_information>'+
								'<project xsi:type="man:ObjectRef">'+
									'<id xsi:type="xsd:integer">1</id>'+
								'</project>'+
								'<category xsi:type="xsd:string">General</category>'+
							'</issue>'+
							'</man:mc_issue_add>'+
					'</soapenv:Body>'+
					'</soapenv:Envelope>';

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        alert('Zgłoszenie wysłąne do mantisa!');
                    } else{
						alert('Coś poszło nie tak. Sprawdź logi przeglądarki.');
					}
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
        }