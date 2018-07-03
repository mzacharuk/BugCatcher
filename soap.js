document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById("soap");
	// onClick's logic below:
    button.addEventListener('click', soap);
});

var idFromResponse;

function soap() {
			var response;
			var parsedXML;
			xmlParser = new DOMParser();
			
            var addIssueRequest = new XMLHttpRequest();
            addIssueRequest.open('POST', 'http://localhost/mantisbt/api/soap/mantisconnect.php', true);

			function callback(idFromResponse){
				var addAttachment = 
					'<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:man="http://futureware.biz/mantisconnect">'+
					   '<soapenv:Header/>'+
					   '<soapenv:Body>'+
							'<man:mc_issue_attachment_add soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
								'<username xsi:type="xsd:string">administrator</username>'+
								'<password xsi:type="xsd:string">root</password>'+
								'<issue_id xsi:type="xsd:integer">'+idFromResponse+'</issue_id>'+
								'<name xsi:type="xsd:string">ZrzutEkranuBugCatcher</name>'+
								'<file_type xsi:type="xsd:string">jpg</file_type>'+
								'<content xsi:type="xsd:base64Binary">'+document.getElementById('target').src.substr(23)+'</content>'+
							'</man:mc_issue_attachment_add>'+
						'</soapenv:Body>'+
					'</soapenv:Envelope>';
					
								// Send the Attachment
				var addAttachmentRequest = new XMLHttpRequest();
				addAttachmentRequest.open('POST', 'http://localhost/mantisbt/api/soap/mantisconnect.php', true);

				addAttachmentRequest.onreadystatechange = function () {
					if (addAttachmentRequest.readyState == 4) {
						if (addAttachmentRequest.status == 200) {
							console.log("Załącznik wysłany");
						} else{
							alert('Załącznik nie wysłany. Spróbuj ponownie.');
						}
					}
				}
				addAttachmentRequest.setRequestHeader('Content-Type', 'text/xml');
				addAttachmentRequest.send(addAttachment);
			}
			
			// build SOAP request
            var addIssue =
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
			
            addIssueRequest.onreadystatechange = function() {
                if (addIssueRequest.readyState == 4) {
                    if (addIssueRequest.status == 200) {
						response = addIssueRequest.responseText;
						parsedXML = xmlParser.parseFromString(response,"text/xml");
						idFromResponse = parsedXML.getElementsByTagName("return")[0].childNodes[0].nodeValue;
						alert('Zgłoszenie o numerze '+idFromResponse+' wysłane do mantisa!');
						callback(idFromResponse);
                    } else{
						alert('Coś poszło nie tak. Spróbuj ponownie.');
					}
                }
            }


            // Send the Issue
            addIssueRequest.setRequestHeader('Content-Type', 'text/xml');
            addIssueRequest.send(addIssue);
			
        }