# Salesforce-LWC-DynamicBanner
Add a highly customizable banner to any record page

**Features**

* **Styling**: Easily set background color, border width and color, font color, and text alignment... has HTML support for more complex styling
* **Dynamic Content**: Include content from the current record (and related parent records, including through a polymorphic relationship!) by wrapping a field API name in "{{}}"
  - Example from an Opportunity record
    - "This is {{Name}} Opportunity, and it's Account is {{Account.Name}}" would yield something like...
    - "This is Cool Deal Opportunity, and it's Account is Super Cool Account"
    - Use SOQL formatting for parent relationships, like Parent_Object__r.Custom_Field__c to reference a custom field on a custom parent object
    - For polymorphic relationships, like if you want to display information on a Task record page that's linked to a Case, add the API name of the polymorphically related SObject in parentheses before the field you're referencing. For example (Case)What.Parent.Custom_Lookup__r.Owner.Name
* **Collapsable**: Display a title and hide the rest of the content (and decide if it's collapsed or expanded by default)
* **Double it**: show two banners, oriented horizontally or vertically, each with their own styling



![screenshot](/readme_images/screenshot.png?raw=true)
