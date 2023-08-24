# Salesforce-LWC-DynamicBanner
Add a highly customizable banner to any record page

**Features**

* **Styling**: Easily set background color, border width and color, font color, and text alignment... has HTML support for more complex styling
* **Dynamic Contact**: Include content from the current record (and related parent records!) by wrapping a field API name in "~~"
  - Example from an Opportunity record
    - "This is \~\~Name\~\~ Opportunity, and it's Account is \~\~Account.Name\~\~" would yield something like...
    - "This is Cool Deal Opportunity, and it's Account is Super Cool Account"
    - Use SOQL formatting for parent relationships, like "Parent_Object__r.Custom_Field__c" to reference a custom field on a custom parent object
* **Collapsable**: Display a title and hide the rest of the content (and decide if it's collapsed or expanded by default)
* **Double it**: show two banners, oriented horizontally or vertically, each with their own styling



![screenshot](/readme_images/screenshot.png?raw=true)
