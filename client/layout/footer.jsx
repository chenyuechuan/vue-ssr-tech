import '../assets/styles/footer.styl'
export default {
    data () {
        return {
            aothor: 'ChenYuechuan'
        }
    },
    render () {
        return (
            <div id='footer'>
                <span>Writen by {this.aothor}</span>
            </div>
        )
    }
}
