import { LightningElement, wire, api } from 'lwc';
import { getContents } from "experience/cmsDeliveryApi";
import siteId from "@salesforce/site/Id";

export default class CMSMultipleContentDisplayLWC extends LightningElement {
    @api contentId1;
    @api contentId2;
    @api contentId3;

    contentBody1 = "";
    contentBody2 = "";
    contentBody3 = "";

    get contentIdList() {
        return [this.contentId1, this.contentId2, this.contentId3].filter(Boolean);
    }

    @wire(getContents, { 
        channelOrSiteId: siteId, 
        contentKeys: "$contentIdList",
        includeContentBody: true
    })
    onGetContents({ data, error }) {
        if (data && Array.isArray(data.contents)) { 
            data.contents.forEach(content => {
                let bodyContent = content.contentBody?.body || "";

                this.contentBody1 = (content.contentKey === this.contentId1) ? bodyContent : this.contentBody1;
                this.contentBody2 = (content.contentKey === this.contentId2) ? bodyContent : this.contentBody2;
                this.contentBody3 = (content.contentKey === this.contentId3) ? bodyContent : this.contentBody3;
            });
        } else if (error) {
            console.error("Error fetching CMS content:", error);
        }
    }
}
