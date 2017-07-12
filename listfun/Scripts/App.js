'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to 
    // use the SharePoint object model
    $(document).ready(function () {
        getUserName();
        $('#okay').click(retrieveListItems);
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}

// var siteUrl = '/sites/MySiteCollection';
console.log("Things are happppening")


var siteUrl = '/sites/dev/listfun';
    // https://higherwiretechnologies-6553ca70b9b634.sharepoint.com/sites/dev/listfun

// $('#okay').click(retrieveListItems)

        
function retrieveListItems(e) {
    e.preventDefault()
            //var clientContext = new SP.currentContext();
            //var ctx = new SP.ClientContext.get_current();
            console.log("Loooooging")
            // alert('Y U LIKE DIS SHAREPOINT')
            var clientContext = new SP.ClientContext(siteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle('Announcements');

            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                '<Value Type=\'Number\'>1</Value></Geq></Where></Query><RowLimit>10</RowLimit></View>');
            var collListItem = oList.getItems(camlQuery);

            clientContext.load(this.collListItem);

            clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                // Function.createDelegate(this, this.onQuerySucceeded),
                // Function.createDelegate(this, this.onQueryFailed));
        };

function onQuerySucceeded(sender, args) {

    var listItemInfo = '';

    var listItemEnumerator = this.collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo += '\nID: ' + oListItem.get_id() +
            '\nTitle: ' + oListItem.get_item('Title') +
            '\nBody: ' + oListItem.get_item('Body');
    }

    alert(listItemInfo.toString());
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
