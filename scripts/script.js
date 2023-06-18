var clusters_info;

$.getJSON( "https://leandrosouzaa.github.io/user-behavior/files/clusters-data.json", function( data ) {
   clusters_info = data;
 });

function findCluster(id) {
   return clusters_info.find(item =>item.id == id)
}

function showModal(d) {
   cluster = findCluster(d.data.id);
   $('#modal').show();
   $('#modal').css( { left: d3.event.pageX, top: d3.event.pageY } ) 
   $('#com_name').text(cluster.name)
   $('#com_users').text(cluster.size)
   $('#com_id').text('#' + ('0' + cluster.id).slice(-2))
}