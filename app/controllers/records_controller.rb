class RecordsController < ApplicationController

  def index
    @records = Record.all
  end

  def create
    @record = Record.new(record_params)
    if @record.save
      #handle successful creation
      render json: @record
    else
      #handle problem
      flash[:danger] = "Something went wrong. :("
      render 'new'
    end
  end

  # def new
  #   @record = Record.new
  # end

  private

    def record_params
      params.require(:record).permit(:title,:date,:amount)
    end

end
