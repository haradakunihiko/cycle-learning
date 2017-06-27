import React from 'react';
import Relay from 'react-relay';
// import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
// import FontIcon from 'material-ui/FontIcon';
// import {Tabs, Tab} from 'material-ui/Tabs';
import PDF from 'react-pdf-js';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import StartSessionMutation from 'route/StartSessionMutation';
import { Checkbox } from 'react-icheck';
import d3 from 'd3'
import nv from 'nvd3'
import Page from 'app/Page';
// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const FACTORS = [0.5, 0.3, 0.2]

function stream_index(d, i) {
  return {x: i, y: Math.max(0, d)};
}

function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
}
class Plot extends React.Component {
	componentDidMount() {
		this.plotPie();
		this.plot();
	}

	plotPie() {
		const data = this.parse();
		const countByScore = data.reduce((acc, score) => {
			if (!acc[score]) {
				acc[score] = 0;
			}
			acc[score] += 1;
			return acc;
		}, {});

		const scores = Object.keys(countByScore).sort();

        var colors = ["green", "gray"];

    var testdata2 = scores.map((score) => ({
    	key: score, y: countByScore[score]
    }))

    	console.log(scores)
    	console.log(countByScore)
    	var arcRadius2 = scores.map((score) => ({
    		inner: 1 - score, outer: 1
    	}));
 
        var height = 350;
        var width = 350;
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
            .x(function (d) { return d.key })
            .y(function (d) { return d.y })
            .donut(true)
            .width(width)
            .height(height)
			.arcsRadius(arcRadius2)
			.donutLabelsOutside(true)
			.labelSunbeamLayout(true)
            .id('donut2'); // allow custom CSS for this one svg
            d3.select("#plot svg")
            .datum(testdata2)
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
            return chart;
        });
	}

	plotMultiBar() {
	    //var test_data = stream_layers(3,128,.1).map(function(data, i) {
	    var test_data = stream_layers(3,128,.1).map(function(data, i) {
	        return {
	            key: (i == 1) ? 'Non-stackable Stream' + i: 'Stream' + i,
	            nonStackable: (i == 1),
	            values: data
	        };
	    });
	    nv.addGraph({
	        generate: function() {
	            var width = nv.utils.windowSize().width,
	                height = nv.utils.windowSize().height;
	            var chart = nv.models.multiBarChart()
	                .width(width)
	                .height(300 || height)
	                .stacked(true)
	                ;
	            chart.dispatch.on('renderEnd', function(){
	                console.log('Render Complete');
	            });
	            var svg = d3.select('#plot svg').datum(test_data);
	            console.log('calling chart');
	            svg.transition().duration(0).call(chart);
	            return chart;
	        },
	        callback: function(graph) {
	            nv.utils.windowResize(function() {
	                var width = nv.utils.windowSize().width;
	                var height = nv.utils.windowSize().height;
	                graph.width(width).height(height);
	                d3.select('#plot svg')
	                    .attr('width', width)
	                    .attr('height', 300 || height)
	                    .transition().duration(0)
	                    .call(graph);
	            });
	        }
	    });
	}

	plot() {
		var layout = {
		  title: "Your scoure distribution",
		  xaxis: {title: "Score"},
		  yaxis: {title: "Count"},
		  barmode: "overlay",
		  bargap: 0.25,
		  bargroupgap: 0.3
		};
		Plotly.newPlot('plot1', [
			{
				x: this.parse(),
				type: 'histogram',
				histnorm: 'count',
				marker: {
					color: 'rgb(255,255,100)',
				},
			}
		], layout);
	}

	parse() {
		const { bookHistgram } = this.props;

		const data = bookHistgram.quizLogStats.map((quizLogStat) => {
			return quizLogStat.logs.map(({ score }, index) => {
				return score * FACTORS[index]
			}).reduce((acc, score) => {
				return acc + score
			}, 0)
		});
		return data;
	}

	render() {
		return (
			<div>
				<div id="plot1"></div>
				<div id="plot" style={{height: 350, width: 350}}><svg></svg></div>
			</div>
		)
	}
	// render() {
	// 	return <div id="plot"><svg /></div>
	// }
}

const styles = {
	container : {
		margin: 10
	}
}

class QuizTrainingPage extends React.Component {

    static contextTypes = {
        viewer: React.PropTypes.object
    }

	constructor(props) {
		super(props);
		this.state = {
			selected: {}
		}
	}

	componentDidMount() {
		$('.bar').sparkline('html', {type: 'bar', barColor: 'red'});
	}


	handleRowSelection(index){
		return (e) => {
			console.log(index)
			this.setState({
				selected : {
					...this.state.selected,
					[index]: !e.target.checked
				}
			});	
		}
	}

	onClickStart(){
		const { node : {  book : { namespaces } } } = this.props

		this.props.relay.commitUpdate(new StartSessionMutation({
			namespaces: namespaces.filter((namespace, index) => {
				return !!this.state.selected[index]
			}).map((namespace) => {
				return namespace.text
			}),
			user : this.context.viewer.user,
			bookLog  : this.props.node
		}), {
			onSuccess: (data) => {
				browserHistory.push(`/training/session/${data.createSessionMutation.session.id}`);
			}
		});
	}

	render() {
		const { node : { book: { namespaces, label }, bookHistgram } } = this.props

		return (
			<Page title={label} breadcrumbList={[{label: label}]}>
				<div className="wrapper wrapper-content animated fadeInRight">
					<div className="row">
						<div className="ibox-content">
							<table className="table table-striped">
								<thead>
									<tr>
										<th></th>
										<th>Namespace</th>
										<th>count</th>
										<th>score distribution</th>
									</tr>
								</thead>
								<tbody>
									{namespaces.map(({text, count}, index) => {
										const stats = bookHistgram.quizLogStats.filter((quizLogStat) => {
											return quizLogStat.quiz.namespace.indexOf(text) == 0
										});

										const data = stats.map((quizLogStat) => {
											return quizLogStat.logs.map(({ score }, index) => {
												return score * FACTORS[index]
											}).reduce((acc, score) => {
												return acc + score
											}, 0)
										});
										const countByScore = data.reduce((acc, score) => {
											if (!acc[score]) {
												acc[score] = 0;
											}
											acc[score] += 1;
											return acc;
										}, {});


										const result = [0, 0.2, 0.3, 0.5, 0.7, 0.8, 1].map((score) => {
											return countByScore[score] || 0
										});
										return (
											<tr key={index}>
												<td><Checkbox onChange={::this.handleRowSelection(index)} checkboxClass="icheckbox_square-green" checked={!!this.state.selected[index]}/></td>
												<td>{text}</td>
												<td>{count}</td>
												<td><span className="bar">{result.join(',')}</span></td>
											</tr>
										)
									})}							
								</tbody>
							</table>
							<button className="btn btn-primary" onClick={::this.onClickStart}>try all quiz</button>
							<button className="m-l-sm btn" onClick={::this.onClickStart}>try not answered quiz</button>
							<button className="m-l-sm btn" onClick={::this.onClickStart}>try recomended quiz</button>
						</div>
						<div className="ibox-content m-t">
							<Plot bookHistgram={bookHistgram}/>
						</div>
					</div>
				</div>

			</Page>
		);
	}
}

export default Relay.createContainer(QuizTrainingPage, {
  fragments: {
    node: () => Relay.QL`
		fragment on BookLog {
			ndbId
			book {
				ndbId
				label
				namespaces {
					text,
					count
				}	
			}
		      bookHistgram {
		        quizLogStats {
		          quiz {
		            ndbId
		            namespace
		          }
		          logs {
		            score
		          }
		        }
		      }
		}
    `,
  },
});
