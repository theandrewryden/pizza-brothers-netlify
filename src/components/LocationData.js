import React from "react";

class LocationData extends React.Component {
    getJsonSchema = ({title, url, image, locations}) => {
        let json = {
            "@context": {
                "@vocab": "http://schema.org"
            },
            "@graph": [
                {
                    "@id": "https://www.mypizzabrothers.com",
                    "@type": "Organization",
                    "name": title,
                    "url": url,
                    "logo": image,
                    "sameAs": [
                        "https://www.facebook.com/pizzabrothersnj/",
                    ]
                }
            ]
        };
        json = JSON.stringify(json);
        locations.map((location) => (
            json = json + JSON.stringify({
                "@type": "LocalBusiness",
                "parentOrganization": {
                    "name": title
                },
                "name": "Pizza Brothers of "+location.frontmatter.title,
                /** Add Address Here **/
                "address": {
                    "@type": "PostalAddress",
                    "telephone": location.frontmatter.phone
                },
                "openingHours": [ "Mo-Sa 10:00-22:00", "Su 10:00-20:00"],
                "hasmap": location.frontmatter.mapEmbedUrl
            })
        ));

        return json;
    };
    render() {
        return (
            <script type="application/ld+json">
                {this.getJsonSchema(this.props)}
            </script>
        )
    }
}

export default LocationData