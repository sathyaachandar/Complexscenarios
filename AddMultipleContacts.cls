/*🚀 Just Built a Salesforce LWC: AddMultipleContacts! 🚀
Tired of repetitive contact entries? I’ve created a Lightning Web Component (LWC) to add/remove multiple contacts in just a few clicks!
✅ Key Features:
✔️ Add Dynamically: Click "+" to create new contact fields on the fly.
✔️ Delete Flexibly: Remove unwanted entries instantly with the "🗑️" button.
✔️ Bulk Save: Submit all contacts at once – no manual redundancy!
✔️ Validation: Ensures required fields (like Last Name*) are filled before saving.
✔️ Clean UI: User-friendly interface with smooth interactions.
💡 Why it matters: Perfect for admins/users handling bulk data entry – saves time and reduces errors!
🛠 Tech Stack: Salesforce Lightning Web Components (LWC), JavaScript, Apex.
👨💻 Curious how it works? Check it out on GitHub: 🔗 GitHub Repo
Let me know your thoughts in the comments – happy to share insights! 🚀
hashtag#Salesforce hashtag#LWC hashtag#ProductivityHacks hashtag#CRM hashtag#LightningWebComponents hashtag#TechInnovation*/

public with sharing class addMultipleContacts {
    @AuraEnabled
    public static ResponseWrapper saveMultipleContacts(List<Contact>contacts){
        ResponseWrapper response = new ResponseWrapper();
        try {
            insert contacts;
            response.isSuccess=true;
        } catch (Exception e) {
            response.isSuccess=false;
            response.message=e.getMessage();
        }
        return response;
    }

    public class ResponseWrapper 
    {
        @AuraEnabled
        public Boolean isSuccess{get;set;}
        @AuraEnabled
        public String message{get;set;}
    }
}
