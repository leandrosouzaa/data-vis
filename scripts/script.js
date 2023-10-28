var clusters_info;
var colors

$.getJSON( "https://leandrosouzaa.github.io/data-vis/files/clusters-structure.json", function( data ) {
   clusters_info = data;
 });

 $.getJSON( "https://leandrosouzaa.github.io/data-vis/files/colors.json", function( data ) {
   colors = data;
 });
 
var rainbow = new Rainbow(); 
rainbow.setNumberRange(1, 400);
rainbow.setSpectrum('deepskyblue', 'red');
console.log(rainbow.colourAt(2))

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
   console.log(cluster)
   var table = '<table class ="ngrams"><tr class="table_header">   <td style="width: 5%;">#</td>   <td style="width: 90%;">N-grama</td>   <td style="width: 5%; text-align: center;">Score</td></tr>'
   for (let i = 0; i < cluster.ngrams.length; i++) {
      table+= '<tr class="content"><td>'+ i+1 +'</td>'

      ngram = cluster.ngrams[i].ngram.split('_')
      table+= '<td><span style="background-color: '+ colors[ngram[0]] + '" class="ngram_span">' + ngram[0] + '</span><span style="background-color: '+ colors[ngram[1]] + '"class="ngram_span">' + ngram[1] + '</span><span style="background-color: '+ colors[ngram[2]] + '"class="ngram_span">' + ngram[2] + '</span></td>' 

      table+= '<td><div class="ngram_span" style="width: 100% !important; text-align: center;background-color: #'+ rainbow.colourAt(cluster.ngrams[i].score) +'">' + cluster.ngrams[i].score + '</div></td>'
   }

   $('#divtable').html(table)
}