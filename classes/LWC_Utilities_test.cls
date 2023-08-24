@isTest
public class LWC_Utilities_test {
    @isTest static void test_getting_records_with_string_query() {
        // LWC_Utilities.records() should take any standard SOQL query String and return a List of SObjects.

        String query = 'SELECT Id, Name, CreatedBy.Name FROM Account';
        insert new Account(Name = 'Test Account');

        Account expectedAccount = (Account)Database.query(query)[0];

        Account actualAccount = (Account)LWC_Utilities.records(query)[0];

        System.assertEquals(expectedAccount.Id, actualAccount.Id);
        System.assertEquals(expectedAccount.Name, actualAccount.Name);
        System.assertEquals(expectedAccount.CreatedBy.Name, actualAccount.CreatedBy.Name);
    }
}