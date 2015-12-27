/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import * as Shell from 'shell';

interface IMessageLink {
  html: string;
}

interface IMessageCard {
  title: string;
  url: string;
  site: string;
  description: string;
}

interface IMessage {
  id: string;
  message: IMessageLink;
  card: IMessageCard;
  from: string;
  date: Date;
  image: string;
}

interface IMessageProps {
  data: IMessage;
}

interface IMessages {
  items: IMessage[];
}

interface IMessageGroup {
  items: { [date: string]: IMessages };
  keys: string[];
}

export interface IMessageListProps {
  data: IMessageGroup[];
}

class Message extends React.Component<IMessageProps, {value: string;}> {

  constructor(props: IMessageProps) {
      super(props);
  }
  
  linkClick(event: React.MouseEvent): void {
    Shell.openExternal(this.props.data.card.url);
  }
  
  render(): JSX.Element {
    return (
      <li className="item">
        <div id="message-{this.props.data.id}">
        {
          if (this.props.data.message !== null) {
            (
            <div>
              <span className="name">{this.props.data.from}</span>
              <span className="date">{this.props.data.date}</span>
              <div my-compile="toTrusted(this.props.data.message.html)"></div>
            </div>
            )
          }
          if (this.props.data.image !== null) {
            (
              <div>
                <a href="{this.props.data.image}" target="{this.props.data.image}">
                  <img src="{this.props.data.image}" alt="image"></img>
                </a>
              </div>
            )
          }
          if (this.props.data.card !== null) {
            (
            <div className="card">
              <div className="quote-bar"></div>
              <div className="indent-content">
                <div className="site">{this.props.data.card.site}</div>
                <div className="url">
                  <a href="{this.props.data.card.url}" target="{this.props.data.card.url}" onClick={this.linkClick}>{this.props.data.card.title}</a>
                </div>
                <div className="description">{this.props.data.card.description}</div>
              </div>
            </div>
            )
          }
        </div>
      </li>
    );
  }
}

export default class MessageList extends React.Component<IMessageListProps, {value: string;}> {

  constructor(props: IMessageListProps) {
      super(props);
  }
  
  render(): JSX.Element {
    return (
      <ul id="messages">
      {
        this.props.data.map((group) => {
          return group.keys.map((key) => {
            return (
              <li>
                <div className="date-span">
                  <div className="date">{key}</div>
                </div>
                <ul>
                  { 
                    group.items[key].items.map((message) => {
                      return (
                        <Message data={message}></Message>
                      );
                    })
                  }
                </ul>
              </li>
            );
          });
        })
      }
      </ul>
    );
  }
}
