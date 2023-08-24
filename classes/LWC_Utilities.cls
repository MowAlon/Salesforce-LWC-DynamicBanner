public with sharing class LWC_Utilities {
    @AuraEnabled(cacheable=true)
    public static SObject[] records(String query) {
        return Database.query(query);
    }
}